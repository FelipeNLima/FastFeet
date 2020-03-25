import * as Yup from 'yup';
import { Op } from 'sequelize';

import File from '../models/File';
import Orders from '../models/Orders';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class CompletedDeliveries {
  async index(req, res) {
    const { deliveryman_id } = req.params;
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found.' });
    }

    const deliveries = await Orders.findAll({
      where: {
        deliveryman_id,
        canceled_at: null,
        end_date: {
          [Op.ne]: null,
        },
      },
      attributes: ['id', 'product', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'city'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      end_date: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { deliveryman_id, delivery_id } = req.params;

    const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

    if (!deliverymanExists)
      return res.status(400).json({ error: 'Deliveryman is not Exists' });

    const delivery = await Orders.findByPk(delivery_id);

    if (!delivery) return res.status(400).json({ error: 'Delivery not found' });

    if (!req.file)
      return res.status(400).json({ error: 'The signature needs to be sent' });

    if (Number(deliveryman_id) !== delivery.deliveryman_id)
      return res.status(401).json({ error: "You don't have permission." });

    if (!delivery.start_date)
      return res
        .status(400)
        .json({ error: 'That delivery has not yet been withdrawn' });

    if (delivery.canceled_at || delivery.end_date) {
      return res.status(400).json({ error: 'Completed order' });
    }

    const { end_date } = req.body;

    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    await delivery.update({
      end_date,
      signature_id: file.id,
    });

    await delivery.reload({
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'url', 'name', 'path'],
        },
      ],
    });

    return res.json(delivery);
  }
}

export default new CompletedDeliveries();
