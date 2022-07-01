import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CurrencyApiService } from '../shared/services/currency-api.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public currencies$: Observable<any>;
  public favorite$: Observable<any>;
  public baseOption$: Observable<any>;
  public baseCurrency$: Observable<any>;

  constructor (
    private currencySvc: CurrencyApiService,
  ) { }

  ngOnInit() {
    this.loadInitCurrencies();
    this.currencies$ = this.currencySvc.currenciesObs$;
    this.favorite$ = this.currencySvc.faveObs$;
    this.baseOption$ = this.currencySvc.baseOpt$;
    this.baseCurrency$ = this.currencySvc.baseSource$;
  }

  public hasProperties(data): boolean {
    return Object.keys(data).length ? true : false;
  }

  private async loadInitCurrencies() {
    this.currencySvc.getBaseCurrency().pipe(first()).subscribe();
    this.currencySvc.getFavourites().pipe(first()).subscribe();
  }

}
