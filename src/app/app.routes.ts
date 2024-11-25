import { Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { LoginComponent } from './views/login/login.component';
import { IndicadoresComponent } from './views/indicadores/indicadores.component';
import { EstabelecimentosComponent } from './views/estabelecimentos/estabelecimentos.component';
import { HomeComponent } from './views/home/home.component';

export const routes: Routes = [
  // TODO: Organizar modulos
  // {
  //   path: 'app',
  //   component: MainLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () => import('./modules/private/private.module').then(m => m.PrivateModule)
  //     },
  //     {
  //       path: 'dados-abertos-saude',
  //       loadChildren: () => import('./modules/dados-abertos-saude/dados-abertos-saude.module').then(m => m.DadosAbertosSaudeModule)
  //     },
  //     {
  //       path: 'indicadores',
  //       loadChildren: () => import('./modules/indicadores/indicadores.module')
  //         .then(m => m.IndicadoresModule)
  //     }
  //   ]
  // },
  { path: 'login', component: LoginComponent, title: 'Sistema de Análise em Saúde Integrada | SASI' },
  { path: 'home', component: HomeComponent, title: 'Página Inicial | SASI ' },
  { path: 'indicadores', component: IndicadoresComponent, title: 'Indicadores de Saúde | SASI' },
  { path: 'estabelecimentos', component: EstabelecimentosComponent, title: 'Estabelecimentos de Saúde | SASI ' },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];