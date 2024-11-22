import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from '../../components/map/map.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: MapComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MapComponent
  ]
})
export class PrivateModule { }