import { Routes } from '@angular/router';
import { authRoutes } from '@modules/auth/auth.routes';
import { gameRoutes } from '@modules/game/game.routes';
import { profileRoutes } from '@modules/profile/profile.routes';
import { userRoutes } from '@modules/user/user.routes';
import { AuthGuard } from './guards/auth.guard';
import { DynamicPermissionGuard } from './guards/dynamic-permission.guard';
import { LoginGuard } from './guards/login.guard';
import { PermissionGuard } from './guards/permission.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () => import('./components/layouts/base-layout/base-layout.component'),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/layouts/home-layout/home-layout.component'),
        children: [
          {
            path: 'test-components',
            loadComponent: () => import('./pages/test-components-page/test-components-page.component'),
            canActivate: [LoginGuard],
          },
          {
            path: 'not-found-page',
            loadComponent: () => import('./pages/not-found-page/not-found-page.component'),
          },
          ...authRoutes,
        ],
      },
      {
        path: 'private',
        loadComponent: () => import('@components/layouts/private-layout/private-layout.component'),
        canActivate: [AuthGuard],
        children: [
          {
            path: 'my-dashboard',
            canActivate: [PermissionGuard],
            data: { permissions: ['home.dashboard'] },
            loadComponent: () => import('./pages/my-dashboard-page/my-dashboard-page.component'),
          },
          {
            path: 'form/:entity',
            canActivate: [DynamicPermissionGuard],
            data: { permissions: ['dynamic_form.{entity}.read'] },
            loadComponent: () => import('./pages/form-page/form-page.component'),
          },
          ...userRoutes,
          ...profileRoutes,
        ],
      },
      {
        path: 'games',
        loadComponent: () => import('@components/layouts/game-layout/game-layout.component'),
        canActivate: [AuthGuard],
        children: [...gameRoutes],
      },
    ],
  },
  { path: '**', redirectTo: '/not-found-page' },
];
