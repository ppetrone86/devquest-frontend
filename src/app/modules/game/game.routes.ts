import { Routes } from '@angular/router';
import { PermissionGuard } from '@src/app/guards/permission.guard';

export const gameRoutes: Routes = [
  {
    // List all games the user can see or join
    path: '',
    canActivate: [PermissionGuard],
    data: { permissions: ['entities.games.read'] },
    loadComponent: () => import('./pages/game-list/game-list.component').then((m) => m.GameListComponent),
  },
  {
    // Form to create a new game
    path: 'create',
    canActivate: [PermissionGuard],
    data: { permissions: ['entities.games.create'] },
    loadComponent: () => import('./pages/game-create/game-create.component').then((m) => m.GameCreateComponent),
  },
  {
    // Form to join a game via access code
    path: 'join',
    canActivate: [PermissionGuard],
    data: { permissions: ['entities.games.read'] },
    loadComponent: () => import('./pages/game-join/game-join.component').then((m) => m.GameJoinComponent),
  },
  {
    // Waiting room for a specific game (see players, start button)
    path: ':id',
    canActivate: [PermissionGuard],
    data: { permissions: ['entities.games.read'] },
    loadComponent: () => import('./pages/game-room/game-room.component').then((m) => m.GameRoomComponent),
  },
  {
    // Actual play screen for a specific game
    path: ':id/play',
    canActivate: [PermissionGuard],
    data: { permissions: ['entities.games.update'] },
    loadComponent: () => import('./pages/game-play/game-play.component').then((m) => m.GamePlayComponent),
  },
];
