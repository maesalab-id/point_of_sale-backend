// Initializes the `vouchers` service on path `/vouchers`
const { Vouchers } = require('./vouchers.class');
const createModel = require('../../models/vouchers.model');
const hooks = require('./vouchers.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/vouchers', new Vouchers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('vouchers');

  service.hooks(hooks);
};
