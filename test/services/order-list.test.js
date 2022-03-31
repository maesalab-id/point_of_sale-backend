const assert = require('assert');
const app = require('../../src/app');

describe('\'order-list\' service', () => {
  it('registered the service', () => {
    const service = app.service('order-list');

    assert.ok(service, 'Registered the service');
  });
});
