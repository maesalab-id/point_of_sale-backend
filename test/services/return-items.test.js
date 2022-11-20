const assert = require('assert');
const app = require('../../src/app');

describe('\'return-items\' service', () => {
  it('registered the service', () => {
    const service = app.service('return-items');

    assert.ok(service, 'Registered the service');
  });
});
