import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
  {
    path: 'my-profile',
    loadComponent: () => import('./pages/profile-page/profile-page.component'),
  },
];
