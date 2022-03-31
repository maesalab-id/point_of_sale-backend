const assert = require('assert');
const app = require('../../src/app');

describe('\'refunds\' service', () => {
  it('registered the service', () => {
    const service = app.service('refunds');

    assert.ok(service, 'Registered the service');
  });
});
