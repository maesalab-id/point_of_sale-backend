const Sequelize = require('sequelize');

module.exports = function (app) {
  const dbDriver = app.get('database');
  const db_alter = app.get('db_alter');
  const connectionString = app.get(dbDriver);
  const sequelize = new Sequelize(connectionString, {
    dialect: dbDriver,
    logging: false,
    define: {
      freezeTableName: true,
      underscored: true
    }
  });
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    app.set('sequelizeSync', sequelize.sync({ force: false, alter: db_alter }));

    return result;
  };
};
