const assert = require('assert');
const app = require('../../src/app');

describe('\'vendors\' service', () => {
  it('registered the service', () => {
    const service = app.service('vendors');

    assert.ok(service, 'Registered the service');
  });
});
