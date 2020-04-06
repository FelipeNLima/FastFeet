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
    const { page = 1, q: name } = req.query;

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

    return res.json(order);
  }

  async update(req, res) {
    const { id } = req.params;

    const { recipient_id, deliveryman_id } = req.body;

    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
    });

    try {
      await schema.validate(req.body);

      const order = await Orders.findByPk(id);

      if (!order) {
        return res.status(401).json({ error: 'Order cannot exists.' });
      }

      const recipientExists = await Recipients.findByPk(recipient_id);
      const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

      if (!recipientExists) {
        return res.status(401).json({ error: 'Recipient cannot exists.' });
      }

      if (!deliverymanExists) {
        return res.status(401).json({ error: 'Recipient cannot exists.' });
      }

      if (order.start_date && order.deliveryman_id !== deliveryman_id) {
        return res.status(401).json({
          error:
            ' The order has left for delivery, you cannot change the delivery man',
        });
      }

      await order.update(req.body);

      return res.json(order);
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
