import auth from './auth.handlers';
import user from './user.handlers';

export const handlers = [
    ...auth,
    ...user,
    // add more domains here (orders, bom, etc.)
];
