const baseServices = {
    firebaseService: Symbol.for('firebaseService'),
    alertService: Symbol.for('alertService'),
    routerService: Symbol.for('routerService'),
    errorService: Symbol.for('errorService'),
};

const dbServices = {
    todoDbService: Symbol.for('todoDbService'),
};

const viewServices = {
    todoViewService: Symbol.for('todoViewService'),
};

export const TYPES = {
    ...baseServices,
    ...dbServices,
    ...viewServices,
};

export default TYPES;
