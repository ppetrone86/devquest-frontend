import { HttpResponse, delay } from 'msw';
import { routes } from '../utils';
import { environment } from '@src/environments/environment';

const sleep = () => delay(environment.mocks?.networkDelayMs ?? 0);

/**
 * OAuth token endpoint mock.
 * Supports both authorization_code and refresh_token grant types.
 */
const tokenResolver = async ({ request }: any) => {
    console.log('[MSW] hit /oauth2/token:', request.url);
    await sleep();

    let grant = 'authorization_code';
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/x-www-form-urlencoded')) {
        const body = await request.text();
        grant = new URLSearchParams(body).get('grant_type') ?? grant;
    } else {
        try { grant = (await request.json())?.grant_type ?? grant; } catch { /* empty */ }
    }

    const t = environment.mocks.token;

    // Toggle errors easily (for tests): add ?mockError=401 or set localStorage('MSW_AUTH_401','1')
    const url = new URL(request.url);
    if (url.searchParams.get('mockError') === '401' || localStorage.getItem('MSW_AUTH_401')) {
        return HttpResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    if (grant === 'refresh_token') {
        return HttpResponse.json({
            access_token: `${t.access_token}-ref`,
            refresh_token: `${t.refresh_token}-next`,
            token_type: t.token_type,
            expires_in: t.expires_in
        });
    }

    return HttpResponse.json({
        access_token: t.access_token,
        refresh_token: t.refresh_token,
        token_type: t.token_type,
        expires_in: t.expires_in
    });
};

export default [
    ...routes('post', '/oauth2/token', tokenResolver),
];
