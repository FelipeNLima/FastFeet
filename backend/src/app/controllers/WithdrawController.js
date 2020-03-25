import * as Yup from 'yup';
import { parseISO, getHours, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Orders from '../models/Orders';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

class WithdrawController {
  async index(req, res) {
    const { deliveryman_id } = req.params;
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found.' });
    }

    const order = await Orders.findAll({
      where: {
        deliveryman_id,
        canceled_at: null,
        end_date: null,
      },
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'postalcode',
          ],
        },
      ],
      attributes: [
        'id',
        'product',
        'status',
        'created_at',
        'canceled_at',
        'start_date',
        'end_date',
      ],
    });

    return res.json(order);
  }

  async show(req, res) {
    const { deliveryman_id, order_id } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found.' });
    }

    const order = await Orders.findOne({
      where: {
        deliveryman_id,
        id: order_id,
        canceled_at: null,
      },
      attributes: ['id', 'product', 'status', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
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

    if (!order) {
      return res.status(400).json({ error: 'This order connot be found.' });
    }

    return res.json(order);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { deliveryman_id, delivery_id } = req.params;

    const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

    if (!deliverymanExists)
      return res.status(400).json({ error: 'Deliveryman is not Exists' });

    const delivery = await Orders.findByPk(delivery_id);

    if (!delivery) return res.status(400).json({ error: 'Delivery not found' });

    const { start_date } = req.body;

    if (delivery.canceled_at || delivery.end_date || delivery.start_date)
      return res.status(400).json({ error: 'Delivery closed' });

    const entrydate = parseISO(start_date);

    const hour = getHours(entrydate);

    if (hour <= 8 || hour >= 18)
      return res
        .status(400)
        .json({ error: 'The start date must be between 08:00 and 18:00!' });

    const deliveries = await Orders.findAll({
      where: {
        deliveryman_id,
        canceled_at: null,
        start_date: {
          [Op.between]: [startOfDay(entrydate), endOfDay(entrydate)],
        },
        end_date: null,
      },
    });

    if (deliveries.length >= 5)
      return res
        .status(400)
        .json({ error: 'Deliveryman already has 5 deliveries on the day!' });

    const updated = await delivery.update(req.body);
    return res.json(updated);
  }
}

export default new WithdrawController();
