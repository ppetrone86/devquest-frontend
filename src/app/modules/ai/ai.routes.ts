import { Routes } from '@angular/router';
import { PermissionGuard } from '@src/app/guards/permission.guard';

export const aiRoutes: Routes = [
  {
    path: 'chat',
    canActivate: [PermissionGuard],
    data: { permissions: ['ai.chat.read'] },
    loadComponent: () => import('./pages/chat-page/chat-page.component'),
  },
];
