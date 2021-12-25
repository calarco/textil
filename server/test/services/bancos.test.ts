import app from '../../src/app';

describe('\'bancos\' service', () => {
  it('registered the service', () => {
    const service = app.service('bancos');
    expect(service).toBeTruthy();
  });
});
