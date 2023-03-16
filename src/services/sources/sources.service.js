// Initializes the `sources` service on path `/sources`
const { Sources } = require('./sources.class');
const createModel = require('../../models/sources.model');
const hooks = require('./sources.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/sources', new Sources(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sources');

  service.hooks(hooks);
};
