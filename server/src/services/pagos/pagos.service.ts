// Initializes the `pagos` service on path `/pagos`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Pagos } from './pagos.class';
import createModel from '../../models/pagos.model';
import hooks from './pagos.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'pagos': Pagos & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/pagos', new Pagos(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('pagos');

  service.hooks(hooks);
}
