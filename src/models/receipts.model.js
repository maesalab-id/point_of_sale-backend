// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const receipts = sequelizeClient.define('receipts', {
    receipt_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tax: {
      type: DataTypes.FLOAT,
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
  receipts.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    receipts.belongsTo(models.customers, { onDelete: 'cascade' });
    receipts.hasMany(models.receipt_items, { onDelete: 'cascade' });
  };

  return receipts;
};
