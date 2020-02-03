import Sequelize, { Model } from 'sequelize';

class Orders extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
  }

  //  Associação das tabelas do banco
  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.Delivery, {
      foreignKey: 'deliveryman_id',
      as: 'delivery',
    });
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'avatar',
    });
  }
}

export default Orders;
