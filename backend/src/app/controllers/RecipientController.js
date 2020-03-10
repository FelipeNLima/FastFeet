import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { name, page = 1 } = req.query;
    const recipient = await Recipient.findAll({
      order: ['created_at', 'DESC'],
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
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      postalcode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const recipientExists = await Recipient.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (recipientExists) {
      return res.status(400).json({
        error: 'Recipient already exists.',
      });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      postalcode,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      postalcode,
    });
  }

  async update(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    await recipient.update(req.body);

    return res.json({ recipient });
  }

  async delete(req, res) {
    try {
      const recipient = await Recipient.findByPk(req.params.id);

      await recipient.destroy();

      return res.json();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new RecipientController();
