import { RouterModule } from '@angular/router';
import { CurrencyCardComponent } from './components/currency-card/currency-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CurrencySelectComponent } from './components/currency-select/currency-select.component';
import { GraphComponent } from './components/graph/graph.component';
import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  declarations: [
    CurrencyCardComponent,
    CurrencySelectComponent,
    GraphComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    CurrencyCardComponent,
    CurrencySelectComponent,
    GraphComponent,
    LoadingComponent,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
