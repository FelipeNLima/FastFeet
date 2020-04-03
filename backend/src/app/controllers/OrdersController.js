import * as Yup from 'yup';

import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import Recipients from '../models/Recipient';
import Orders from '../models/Orders';
import File from '../models/File';
import ordersdetailsmail from '../jobs/OrderDetailsMail';
import Queue from '../../lib/Queue';

class OrdersController {
  async index(req, res) {
    const { q: name, page = 1 } = req.query;

    const orders = await Orders.findAll({
      order: ['created_at'],
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'status',
      ],
      where: {
        product: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['url', 'path'],
            },
          ],
        },
        {
          model: Recipients,
          as: 'recipient',
          attributes: ['id', 'name', 'city', 'state'],
        },
      ],
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.json(orders);
  }

  async show(req, res) {
    const { id } = req.params;

    const order = await Orders.findByPk(id, {
      where: {
        canceled_at: null,
      },
      attributes: [
        'id',
        'recipient_id',
        'deliveryman_id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
      ],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['url', 'path'],
            },
          ],
        },
        {
          model: Recipients,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'city',
            'state',
            'postalcode',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'path'],
        },
      ],
    });

    return res.json(order);
  }

  async store(req, res) {
    const { recipient_id, deliveryman_id, product } = req.body;

    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: {
        id: deliveryman_id,
      },
    });

    if (!deliverymanExists) {
      return res.status(400).json({
        error: 'Delivery Man does not exists.',
      });
    }

    const recipientExists = await Recipients.findOne({
      where: {
        id: recipient_id,
      },
    });

    if (!recipientExists) {
      return res.status(400).json({
        error: 'Recipient does not exists.',
      });
    }

    const order = await Orders.create({
      deliveryman_id,
      recipient_id,
      product,
    });

    await Queue.add(ordersdetailsmail.key, {
      deliverymanExists,
      recipientExists,
      order,
    });

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      product,
    });
  }

  async update(req, res) {
    try {
      const orders = await Orders.findByPk(req.params.id, {
        attributes: ['id', 'product'],
        include: [
          {
            model: Orders,
            as: 'delivery',
            attributes: ['name', 'email'],
          },
          {
            model: Recipients,
            as: 'recipient',
            attributes: ['name'],
          },
        ],
      });

      await orders.update(req.body);

      return res.json({ orders });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const orders = await Orders.findByPk(req.params.id, {
        include: [
          {
            model: Orders,
            as: 'delivery',
            attributes: ['id', 'name', 'email'],
          },
          {
            model: Recipients,
            as: 'recipient',
            attributes: ['id', 'name'],
          },
        ],
      });

      await orders.destroy();

      return res.json();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new OrdersController();
