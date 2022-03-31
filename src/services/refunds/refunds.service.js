// Initializes the `refunds` service on path `/refunds`
const { Refunds } = require('./refunds.class');
const createModel = require('../../models/refunds.model');
const hooks = require('./refunds.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/refunds', new Refunds(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('refunds');

  service.hooks(hooks);
};
