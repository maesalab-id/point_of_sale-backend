const assert = require('assert');
const app = require('../../src/app');

describe('\'returns\' service', () => {
  it('registered the service', () => {
    const service = app.service('returns');

    assert.ok(service, 'Registered the service');
  });
});
