import app from '../../src/app';

describe('\'cobros\' service', () => {
  it('registered the service', () => {
    const service = app.service('cobros');
    expect(service).toBeTruthy();
  });
});
