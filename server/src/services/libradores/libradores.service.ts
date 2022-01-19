// Initializes the `libradores` service on path `/libradores`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Libradores } from './libradores.class';
import createModel from '../../models/libradores.model';
import hooks from './libradores.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'libradores': Libradores & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/libradores', new Libradores(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('libradores');

  service.hooks(hooks);
}
