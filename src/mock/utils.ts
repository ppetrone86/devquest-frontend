import { http } from 'msw';
import { environment } from '../environments/environment';

type Resolver = Parameters<typeof http.get>[1];

/**
 * Helper to expose the same mock on both:
 *  - the absolute backend URL (e.g., http://localhost:8080)
 *  - the App Router proxied path (e.g., /api)
 */
export function routes(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    path: string,
    resolver: Resolver
) {
    const base = environment.api.devQuest.url; // keep in sync with your env
    const api = '/api'; // CF App Router prefix (adjust if needed)

    const bind = (url: string) => (http as any)[method](url, resolver);
    return [bind(`${base}${path}`), bind(`${api}${path}`)];
}
