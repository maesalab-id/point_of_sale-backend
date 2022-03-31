const assert = require('assert');
const app = require('../../src/app');

describe('\'receipt-items\' service', () => {
  it('registered the service', () => {
    const service = app.service('receipt-items');

    assert.ok(service, 'Registered the service');
  });
});
