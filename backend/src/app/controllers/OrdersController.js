import * as Yup from 'yup';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Op } from 'sequelize';
import Couriers from '../models/Deliveryman';
import Recipients from '../models/Recipient';
import Orders from '../models/Orders';

import ordersdetailsmail from '../jobs/OrderDetailsMail';
import Queue from '../../lib/Queue';
import Mail from '../../lib/Mail';

class OrdersController {
  async index(req, res) {
    const { q: name, page = 1 } = req.query;

    const orders = await Orders.findAll({
      order: ['created_at'],
      attributes: ['id', 'product'],
      where: {
        product: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: Couriers,
          as: 'delivery',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Recipients,
          as: 'recipient',
          attributes: ['id', 'name'],
        },
      ],
      limit: 10,
      offset: (page - 1) * 20,
    });

    return res.json(orders);
  }

  async store(req, res) {
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

    const deliverymanExists = await Couriers.findOne({
      where: {
        id: req.body.deliveryman_id,
      },
    });

    if (!deliverymanExists) {
      return res.status(400).json({
        error: 'Delivery Man does not exists.',
      });
    }

    const recipientExists = await Recipients.findOne({
      where: {
        id: req.body.recipient_id,
      },
    });

    if (!recipientExists) {
      return res.status(400).json({
        error: 'Recipient does not exists.',
      });
    }

    const { id, recipient_id, deliveryman_id, product } = await Orders.create(
      req.body
    );

    // const date = new Date();

    // await Mail.sendMail({
    //   to: `${deliverymanExists.name} <${deliverymanExists.email}>`,
    //   subject: 'Encomenda Cadastrada',
    //   template: 'orderdetails',
    //   context: {
    //     deliveryman: deliverymanExists.name,
    //     product: req.body.product,
    //     date: format(date, "'dia' dd 'de' MMMM', às' H:mm'h'", { locale: pt }),
    //   },
    // });

    await Queue.add(ordersdetailsmail.key, {
      deliverymanExists,
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
            model: Couriers,
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
            model: Couriers,
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
