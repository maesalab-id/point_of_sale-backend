// Initializes the `receipt-items` service on path `/receipt-items`
const { ReceiptItems } = require('./receipt-items.class');
const createModel = require('../../models/receipt-items.model');
const hooks = require('./receipt-items.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: ['create']
  };

  // Initialize our service with any options it requires
  app.use('/receipt-items', new ReceiptItems(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('receipt-items');

  service.hooks(hooks);
};
