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
  public compareWith: string;
  public baseCurrency: string;
  public rateCompared: string;
  public startDate: string;
  public endDate: string;
  public isLoading: boolean = false;
  public blockMessage = "Select Start and End Date to show the historical graph";
  public rate$: Observable<any>;
  public rangeTitle = " Historical Rate Date";

  constructor (
    private activateRoute: ActivatedRoute,
    private currencySvc: CurrencyApiService,
  ) { }

  ngOnInit() {
    this.baseCurrency = this.activateRoute.snapshot.queryParams['base'];
    this.rateCompared = this.activateRoute.snapshot.queryParams['rate'];
    this.activateRoute.params.subscribe((params) => {
      this.compareWith = params.id;
    });
  }

  public getStartDate(event) {
    this.startDate = event;
    this.getCurrencyRangeValue();
  }

  public getEndDate(event) {
    this.endDate = event;
    this.getCurrencyRangeValue();
  }

  public getCurrencyRangeValue(): void {
    this.isLoading = true;
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
