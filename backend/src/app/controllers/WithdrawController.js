import * as Yup from 'yup';
import { parseISO, getHours, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Orders from '../models/Orders';
import Deliveryman from '../models/Deliveryman';

class WithdrawController {
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
    console.log(updated);
    return res.json(updated);
  }
}

export default new WithdrawController();
