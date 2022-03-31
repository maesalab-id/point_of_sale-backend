// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const refunds = sequelizeClient.define('refunds', {
    reason: {
      type: DataTypes.STRING,
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
  refunds.associate = function (models) {
    refunds.belongsTo(models.orders, { onDelete: 'cascade' });
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return refunds;
};
