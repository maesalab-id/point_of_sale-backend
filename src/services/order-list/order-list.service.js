// Initializes the `order-list` service on path `/order-list`
const { OrderList } = require('./order-list.class');
const createModel = require('../../models/order-list.model');
const hooks = require('./order-list.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: ['create']
  };

  // Initialize our service with any options it requires
  app.use('/order-list', new OrderList(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('order-list');

  service.hooks(hooks);
};
