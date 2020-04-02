import * as Yup from 'yup';
import { Op } from 'sequelize';

import File from '../models/File';
import Orders from '../models/Orders';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import DeliveryProblem from '../models/DeliveryProblem';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class DeliveryProblemController {
  async index(req, res) {
    const { q: name, page = 1 } = req.query;
    const problems = await DeliveryProblem.findAll({
      order: ['created_at'],
      attributes: ['id', 'delivery_id', 'description'],
      where: {
        description: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: Orders,
          as: 'delivery',
          attributes: ['id', 'product'],
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
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
        },
      ],
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.json(problems);
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      const problems = await DeliveryProblem.findAll({
        where: {
          delivery_id: id,
        },
        attributes: ['id', 'delivery_id', 'description', 'created_at'],
      });

      return res.json(problems);
    } catch (err) {
      return res.status(400).json({ error: 'erro' });
    }
  }

  async store(req, res) {
    const { delivery_id } = req.params;
    const { description } = req.body;

    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const delivery = await Orders.findByPk(delivery_id, {
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
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
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!delivery) return res.status(400).json({ error: 'Delivery not found' });

    const { id } = await DeliveryProblem.create({ delivery_id, description });

    return res.json({
      problem: {
        id,
        delivery_id,
        description,
      },
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const problem = await DeliveryProblem.findByPk(id, {
      attributes: ['id', 'delivery_id', 'description'],
      include: [
        {
          model: Orders,
          as: 'delivery',
          attributes: [
            'id',
            'product',
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
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
        },
      ],
    });

    if (!problem) return res.status(400).json({ error: 'Problem not found' });

    const { delivery_id } = problem;

    const delivery = await Orders.findByPk(delivery_id);

    if (!delivery) return res.status(400).json({ error: 'Delivery not found' });

    delivery.canceled_at = new Date();

    await delivery.save();

    await Queue.add(CancellationMail.key, {
      problem,
    });

    await problem.destroy();
    return res.json(delivery);
  }
}

export default new DeliveryProblemController();
