import app from '../../src/app';

describe('\'libradores\' service', () => {
  it('registered the service', () => {
    const service = app.service('libradores');
    expect(service).toBeTruthy();
  });
});
