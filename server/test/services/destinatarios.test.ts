import app from '../../src/app';

describe('\'destinatarios\' service', () => {
  it('registered the service', () => {
    const service = app.service('destinatarios');
    expect(service).toBeTruthy();
  });
});
