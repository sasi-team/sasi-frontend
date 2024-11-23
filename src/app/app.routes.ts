import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule)
      }
    ]
  },
  {
    path: 'app',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/private/private.module').then(m => m.PrivateModule)
      },
      {
        path: 'dados-abertos-saude',
        loadChildren: () => import('./modules/dados-abertos-saude/dados-abertos-saude.module').then(m => m.DadosAbertosSaudeModule)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];