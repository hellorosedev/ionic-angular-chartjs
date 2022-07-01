import { ControllerService } from './../shared/services/controller.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyApiService } from '../shared/services/currency-api.service';

import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.page.html',
  styleUrls: ['./currency.page.scss'],
})
export class CurrencyPage implements OnInit {
  public rate$: Observable<any>;
  public compareWith: string;
  public baseCurrency: string;
  public rateCompared: string;
  public startDate: any;
  public endDate: any;
  public isLoading: boolean = false;

  constructor (
    private activateRoute: ActivatedRoute,
    private currencySvc: CurrencyApiService,
    private controllerSvc: ControllerService
  ) { }

  ngOnInit() {
    this.baseCurrency = this.activateRoute.snapshot.queryParams['base'];
    this.rateCompared = this.activateRoute.snapshot.queryParams['rate'];
    this.activateRoute.params.subscribe((params) => {
      this.compareWith = params.id;
    });
  }

  public getChangeDate() {
    if (this.startDate > this.endDate) {
      return this.controllerSvc.presentAlert('Start date should NOT exceed with End date value');
    }
    const changeStartDate = this.startDate;
    this.startDate = changeStartDate?.split('T')[0];

    const changeEndDate = this.endDate;
    this.endDate = changeEndDate?.split('T')[0];

    if (!this.startDate || !this.endDate) return;
    this.isLoading = true;
    this.getCurrencyRangeValue();
  }

  public getCurrencyRangeValue(): void {
    const selectedCurrency = {
      base: this.baseCurrency,
      compareWith: this.compareWith,
      startDate: this.startDate,
      endDate: this.endDate
    };

    this.rate$ = this.currencySvc.getRangeDate(selectedCurrency)
      .pipe(
        map((currency) => {
          const cur = Object.entries(currency);
          return cur.map(item => ({ date: item[0], rate: item[1][this.compareWith] }));
        }),
        tap(() => this.isLoading = false)
      );
  }

}
