// Initializes the `proveedores` service on path `/proveedores`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Proveedores } from './proveedores.class';
import createModel from '../../models/proveedores.model';
import hooks from './proveedores.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'proveedores': Proveedores & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/proveedores', new Proveedores(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('proveedores');

  service.hooks(hooks);
}
