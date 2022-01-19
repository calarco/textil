import app from '../../src/app';

describe('\'ventas\' service', () => {
  it('registered the service', () => {
    const service = app.service('ventas');
    expect(service).toBeTruthy();
  });
});
