import * as Yup from 'yup';
import { Op } from 'sequelize';

import File from '../models/File';
import Orders from '../models/Orders';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class CompletedDeliveries {
  async index(req, res) {
    const { deliveryman_id } = req.params;
    const { page = 1 } = req.query;

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
      attributes: [
        'id',
        'product',
        'status',
        'created_at',
        'canceled_at',
        'start_date',
        'end_date',
      ],
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
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.json(deliveries);
  }

  async update(req, res) {
    const { signature_id } = req.body;

    const schema = Yup.object().shape({
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { deliveryman_id, delivery_id } = req.params;

    const delivery = await Orders.findOne({
      where: {
        id: delivery_id,
        deliveryman_id,
        canceled_at: null,
      },
    });

    if (!delivery) return res.status(400).json({ error: 'Delivery not found' });

    if (Number(deliveryman_id) !== delivery.deliveryman_id)
      return res.status(401).json({ error: "You don't have permission." });

    if (!delivery.start_date)
      return res
        .status(400)
        .json({ error: 'That delivery has not yet been withdrawn' });

    if (delivery.canceled_at || delivery.end_date) {
      return res.status(400).json({ error: 'Completed order' });
    }

    await delivery.update({
      signature_id,
      end_date: new Date(),
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
