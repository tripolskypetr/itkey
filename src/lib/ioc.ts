import { inject } from "react-declarative";

import FirebaseService from "./services/base/FirebaseService";
import AlertService from "./services/base/AlertService";
import RouterService from "./services/base/RouterService";
import ErrorService from "./services/base/ErrorService";
import LayoutService from "./services/base/LayoutService";

import ClientDbService from "./services/db/ClientDbService";

import ClientViewService from "./services/view/ClientViewService";

import TYPES from './types';
import "./config";

const baseServices = {
    firebaseService: inject<FirebaseService>(TYPES.firebaseService),
    alertService: inject<AlertService>(TYPES.alertService),
    routerService: inject<RouterService>(TYPES.routerService),
    layoutService: inject<LayoutService>(TYPES.layoutService),
    errorService: inject<ErrorService>(TYPES.errorService),
};

const dbServices = {
    clientDbService: inject<ClientDbService>(TYPES.clientDbService),
};

const viewServices = {
    clientViewService: inject<ClientViewService>(TYPES.clientViewService),
};

const ioc = {
    ...baseServices,
    ...dbServices,
    ...viewServices,
};

window.addEventListener('unhandledrejection', () => {
    ioc.routerService.push('/error_page');
});

/*window.addEventListener('error', () => {
    ioc.routerService.push('/error_page');
});*/

(window as any).ioc = ioc;

export default ioc;
