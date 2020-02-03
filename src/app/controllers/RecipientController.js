import * as Yup from 'yup';

import Recipient from '../models/Recipient';
import User from '../models/User';

class RecipientController {
  async store(req, res) {
    const authenticatedadministrator = await User.findOne({
      where: {
        id: req.userId,
      },
    });

    if (!authenticatedadministrator) {
      return res.status(400).json({
        error: 'You are not an authenticated administrator',
      });
    }

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
}

export default new RecipientController();
