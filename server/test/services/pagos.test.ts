import app from '../../src/app';

describe('\'pagos\' service', () => {
  it('registered the service', () => {
    const service = app.service('pagos');
    expect(service).toBeTruthy();
  });
});
