// Initializes the `receipts` service on path `/receipts`
const { Receipts } = require('./receipts.class');
const createModel = require('../../models/receipts.model');
const hooks = require('./receipts.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/receipts', new Receipts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('receipts');

  service.hooks(hooks);
};
