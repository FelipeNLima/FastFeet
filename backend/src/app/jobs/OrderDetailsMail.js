import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class OrderDetailsMail {
  get key() {
    return 'orderDetailsMail';
  }

  async handle({ data }) {
    const date = new Date();
    const { orders } = data;
    Mail.sendMail({
      to: `${orders.deliveries.name} <${orders.deliveries.email}>`,
      subject: 'Produto Cadastrado',
      template: 'orderdetails',
      context: {
        user: orders.deliveries.name,
        date: format(parseISO(date), "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new OrderDetailsMail();
