// Initializes the `return-items` service on path `/return-items`
const { ReturnItems } = require('./return-items.class');
const createModel = require('../../models/return-items.model');
const hooks = require('./return-items.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: ['create']
  };

  // Initialize our service with any options it requires
  app.use('/return-items', new ReturnItems(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('return-items');

  service.hooks(hooks);
};
