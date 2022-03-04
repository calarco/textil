import app from '../../src/app';

describe('\'precios\' service', () => {
  it('registered the service', () => {
    const service = app.service('precios');
    expect(service).toBeTruthy();
  });
});
