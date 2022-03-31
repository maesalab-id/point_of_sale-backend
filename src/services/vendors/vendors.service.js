// Initializes the `vendors` service on path `/vendors`
const { Vendors } = require('./vendors.class');
const createModel = require('../../models/vendors.model');
const hooks = require('./vendors.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/vendors', new Vendors(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('vendors');

  service.hooks(hooks);
};
