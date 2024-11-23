import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DadosAbertosSaudeMapComponent } from './dados-abertos-saude-map/dados-abertos-saude-map.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: DadosAbertosSaudeMapComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DadosAbertosSaudeMapComponent,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ]
})
export class DadosAbertosSaudeModule { }