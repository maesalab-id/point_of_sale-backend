// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const orderList = sequelizeClient.define('order_list', {
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  orderList.associate = function (models) {
    orderList.belongsTo(models.orders, { onDelete: 'cascade' });
    orderList.belongsTo(models.items, { onDelete: 'cascade' });
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return orderList;
};
