import app from '../../src/app';

describe('\'aumentos\' service', () => {
  it('registered the service', () => {
    const service = app.service('aumentos');
    expect(service).toBeTruthy();
  });
});
