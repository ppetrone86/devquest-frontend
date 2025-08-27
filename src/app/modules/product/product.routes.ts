import { Routes } from '@angular/router';
import { PermissionGuard } from '@src/app/guards/permission.guard';

export const productRoutes: Routes = [
  {
    path: 'products',
    canActivate: [PermissionGuard],
    data: { permissions: ['entities.products.read'] },
    loadComponent: () => import('./pages/products-page/products-page.component'),
  },
];
