import { provide } from 'react-declarative';

import FirebaseService from './services/base/FirebaseService';
import AlertService from './services/base/AlertService';
import LayoutService from './services/base/LayoutService';
import RouterService from './services/base/RouterService';
import ErrorService from './services/base/ErrorService';

import ClientDbService from './services/db/ClientDbService';

import ClientViewService from './services/view/ClientViewService';

import TYPES from './types';

provide(TYPES.firebaseService, () => new FirebaseService());
provide(TYPES.alertService, () => new AlertService());
provide(TYPES.layoutService, () => new LayoutService());
provide(TYPES.routerService, () => new RouterService());
provide(TYPES.errorService, () => new ErrorService());

provide(TYPES.clientDbService, () => new ClientDbService());

provide(TYPES.clientViewService, () => new ClientViewService());
