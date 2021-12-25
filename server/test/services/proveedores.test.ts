import app from '../../src/app';

describe('\'proveedores\' service', () => {
  it('registered the service', () => {
    const service = app.service('proveedores');
    expect(service).toBeTruthy();
  });
});
