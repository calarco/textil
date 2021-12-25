// Initializes the `bancos` service on path `/bancos`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Bancos } from './bancos.class';
import createModel from '../../models/bancos.model';
import hooks from './bancos.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'bancos': Bancos & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/bancos', new Bancos(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('bancos');

  service.hooks(hooks);
}
