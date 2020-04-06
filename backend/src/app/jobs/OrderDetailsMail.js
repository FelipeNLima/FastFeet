import Mail from '../../lib/Mail';

class OrderDetailsMail {
  get key() {
    return 'orderDetailsMail';
  }

  async handle({ data }) {
    const { deliverymanExists, recipientExists, order } = data;

    Mail.sendMail({
      to: `${deliverymanExists.name} <${deliverymanExists.email}>`,
      subject: 'Produto Cadastrado',
      template: 'orderdetails',
      context: {
        deliveryman: deliverymanExists.name,
        recipient: recipientExists.name,
        address: `${recipientExists.street}, N° ${recipientExists.number}, ${recipientExists.city} - ${recipientExists.state}`,
        product: order.product,
      },
    });
  }
}

export default new OrderDetailsMail();
