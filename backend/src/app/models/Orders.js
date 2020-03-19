import Sequelize, { Model } from 'sequelize';

class Orders extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        status: {
          type: Sequelize.VIRTUAL,
          get() {
            let status = 'PENDENTE';

            if (this.canceled_at) {
              status = 'CANCELADA';
            }

            if (!this.canceled_at && this.start_date) {
              if (this.end_date) {
                status = 'ENTREGUE';
              } else {
                status = 'RETIRADA';
              }
            }
            return status;
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  // Associação das tabelas do banco
  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}

export default Orders;
