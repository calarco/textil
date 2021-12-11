// Initializes the `cobros` service on path `/cobros`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Cobros } from './cobros.class';
import createModel from '../../models/cobros.model';
import hooks from './cobros.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'cobros': Cobros & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/cobros', new Cobros(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cobros');

  service.hooks(hooks);
}
