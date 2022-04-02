// Initializes the `aumentos` service on path `/aumentos`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Aumentos } from './aumentos.class';
import createModel from '../../models/aumentos.model';
import hooks from './aumentos.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'aumentos': Aumentos & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/aumentos', new Aumentos(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('aumentos');

  service.hooks(hooks);
}
