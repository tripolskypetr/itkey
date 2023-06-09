const baseServices = {
    firebaseService: Symbol.for('firebaseService'),
    alertService: Symbol.for('alertService'),
    layoutService: Symbol.for('layoutService'),
    routerService: Symbol.for('routerService'),
    errorService: Symbol.for('errorService'),
};

const dbServices = {
    clientDbService: Symbol.for('clientDbService'),
};

const viewServices = {
    clientViewService: Symbol.for('clientViewService'),
};

export const TYPES = {
    ...baseServices,
    ...dbServices,
    ...viewServices,
};

export default TYPES;
