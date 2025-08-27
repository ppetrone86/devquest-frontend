import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import { AUTH_TOKEN } from '@src/app/app.config';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    /(.*)/,
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: 'index.html',
    })
  );

  // All regular routes use the Angular engine
  server.get(/(.*)/, (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    // 👇 Extract token from Authorization header
    const tokenHeader = headers.authorization;
    const token = tokenHeader?.startsWith('Bearer ') ? tokenHeader.split(' ')[1] : null;

    // 🪵 LOGGING
    console.log(`📥 SSR request for: ${originalUrl}`);
    console.log('📩 Headers:', JSON.stringify(headers, null, 2));

    if (token) {
      console.log('✅ JWT token found and will be injected into HTML');
      // console.log('🔐 JWT (truncated):', token.substring(0, 30) + '...');
      console.log('🔐 JWT:', token);
      res.cookie('jwt', token, {
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 15,
      });
    } else {
      console.warn('⚠️ No Bearer token found in Authorization header');
    }

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: baseUrl },
          { provide: AUTH_TOKEN, useValue: token }, // 👈 pass JWT Token to Angular
        ],
      })
      .then((html) => {
        // 👇 Inject token into HTML (optional)
        if (token) {
          html = html.replace('</head>', `<script>window.__AUTH_TOKEN__ = ${JSON.stringify(token)};</script></head>`);
        }

        res.send(html);
      })
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
