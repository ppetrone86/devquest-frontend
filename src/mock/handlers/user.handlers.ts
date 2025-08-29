import { HttpResponse, delay } from 'msw';
import { routes } from '../utils';
import { environment } from '@src/environments/environment';
import {LogService} from "@services/log.service";


interface Section  {
    id: string
    operations: string[]
    sections: Section[]
};

const sleep = () => delay(environment.mocks?.networkDelayMs ?? 0);

/** Build the sections tree exactly like the backend response. */
function buildSections(role: 'admin' | 'user'): Section[] {
    return [
        { id: 'home', operations: ['dashboard'], sections: [] },
        {
            id: 'entities',
            operations: [],
            sections: [
                { id: 'users', operations: ['read'], sections: [] },
                { id: 'products', operations: ['read'], sections: [] },
            ],
        },
        {
            id: 'dynamic_form',
            operations: [],
            sections: [
                { id: 'user_registration', operations: ['read'], sections: [] },
                { id: 'physical_product', operations: ['read'], sections: [] },
            ],
        },
    ];
}

/**
 * User details mock. Returns { user, sections } with the exact shape you provided.
 * Use ?as=admin to switch the email or permissions if needed.
 */
const userDetailsResolver = async ({ request }: any) => {
    await sleep();

    const as = new URL(request.url).searchParams.get('as');
    const role: 'admin' | 'user' = as === 'admin' ? 'admin' : 'user';

    const response = {
        user: {
            email: role === 'admin' ? 'admin@wlb.com' : 'rest@wlb.com',
        },
        sections: buildSections(role),
    };

    // Use console.* for diagnostics (service worker context, no Angular services here)
    console.debug('[MSW] /user/details →', response);

    return HttpResponse.json(response);
};



export default [
    // Adjust the path to match UserService.getUserDetails() real path
    ...routes('post', '/rest/services/user/details', userDetailsResolver),
];
