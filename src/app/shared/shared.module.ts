import { RouterModule } from '@angular/router';
import { CurrencyCardComponent } from './components/currency-card/currency-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CurrencySelectComponent } from './components/currency-select/currency-select.component';
import { GraphComponent } from './components/graph/graph.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HeaderComponent } from './components/header/header.component';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';
import { RateCompareCardComponent } from './components/rate-compare-card/rate-compare-card.component';
import { MessageBlockComponent } from './components/message-block/message-block.component';
import { DateRangeComponent } from './components/date-range/date-range.component';

const components = [
  CurrencyCardComponent,
  CurrencySelectComponent,
  GraphComponent,
  LoadingComponent,
  HeaderComponent,
  SubHeaderComponent,
  RateCompareCardComponent,
  MessageBlockComponent,
  DateRangeComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    ...components,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
