// Initializes the `returns` service on path `/returns`
const { Returns } = require('./returns.class');
const createModel = require('../../models/returns.model');
const hooks = require('./returns.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/returns', new Returns(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('returns');

  service.hooks(hooks);
};
