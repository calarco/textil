// Initializes the `compras` service on path `/compras`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Compras } from './compras.class';
import createModel from '../../models/compras.model';
import hooks from './compras.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'compras': Compras & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/compras', new Compras(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('compras');

  service.hooks(hooks);
}
