import { Routes } from '@angular/router';
import { PermissionGuard } from '@src/app/guards/permission.guard';

export const userRoutes: Routes = [
  {
    path: 'users',
    canActivate: [PermissionGuard],
    data: { permissions: ['entities.users.read'] },
    loadComponent: () => import('./pages/users-page/users-page.component'),
  },
  {
    path: 'users/edit/:id',
    canActivate: [PermissionGuard],
    data: { permissions: ['entities.users.update'] },
    loadComponent: () => import('./pages/user-edit/user-edit.component'),
  },
  {
    path: 'users/new',
    canActivate: [PermissionGuard],
    data: { permissions: ['entities.users.create'] },
    loadComponent: () => import('./pages/user-edit/user-edit.component'),
  },
];
