import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndicadoresMapComponent } from './indicadores-map.component';

const routes: Routes = [
  { path: '', component: IndicadoresMapComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IndicadoresMapComponent
  ]
})
export class IndicadoresModule { }