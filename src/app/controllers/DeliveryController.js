import * as Yup from 'yup';

import DeliveryMan from '../models/Delivery';

class DeliveryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const deliverymanExists = await DeliveryMan.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (deliverymanExists) {
      return res.status(400).json({
        error: 'Delivery Man already exists.',
      });
    }

    const { id, name, email } = await DeliveryMan.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new DeliveryController();
