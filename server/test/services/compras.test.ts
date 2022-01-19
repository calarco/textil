import app from '../../src/app';

describe('\'compras\' service', () => {
  it('registered the service', () => {
    const service = app.service('compras');
    expect(service).toBeTruthy();
  });
});
