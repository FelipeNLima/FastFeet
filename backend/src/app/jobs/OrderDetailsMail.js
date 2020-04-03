import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class OrderDetailsMail {
  get key() {
    return 'orderDetailsMail';
  }

  async handle({ data }) {
    const date = new Date();
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
        date: format(parseISO(date), "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new OrderDetailsMail();
