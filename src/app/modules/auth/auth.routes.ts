import { Routes } from '@angular/router';
import { LoginGuard } from '../../guards/login.guard';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page.component'),
    canActivate: [LoginGuard],
  },
  {
    path: 'auth-processing',
    loadComponent: () => import('./pages/auth-processing-page/auth-processing-page.component'),
    canActivate: [LoginGuard],
  },
  {
    path: 'unauthorized-page',
    loadComponent: () => import('./pages/unauthorized-page/unauthorized-page.component'),
  },
];
