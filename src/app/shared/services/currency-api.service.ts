import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, throwError, BehaviorSubject, EMPTY, from, concat } from 'rxjs';
import { tap, map, mergeMap, catchError, switchMap, concatMap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {
  private url: string = '';
  private readonly _baseSource = new BehaviorSubject<any>('USD');
  public baseSource$ = this._baseSource.asObservable();

  private readonly _baseSelections = new BehaviorSubject<any>({});
  public baseOpt$ = this._baseSelections.asObservable();

  private readonly _currenciesSource = new BehaviorSubject<any[]>([]);
  public currenciesObs$: Observable<any> = this._currenciesSource.asObservable();

  private readonly _faveSource = new BehaviorSubject<{}>({});
  public faveObs$ = this._faveSource.asObservable();

  private rates: any = [];
  private faveRates: any = [];
  private base: string = '';

  constructor (
    private http: HttpClient,
    private storageSvc: StorageService
  ) { }

  public getBaseCompareLatest(baseName: string): Observable<any> {
    this.url = environment.currencyAPI + `/latest?base=${baseName}`;

    return this.http.get<any>(this.url)
      .pipe(
        switchMap((result: any) => {
          this.setRateSelection(result);
          return result ? of(result.rates) : from(this.storageSvc.getLocalData(this.url));
        }),
        tap(async (rates) => {
          this.rates = { ...rates };
          this._currenciesSource.next(rates);
          await this.storageSvc.setLocalData(this.url, rates);
          await this.getRateSelection();

        }),
        catchError(err => throwError(err))
      );
  }

  public async addFromCurrentRates(selectedRate) {
    try {
      delete this.rates[selectedRate.key];
      await this.storageSvc.setLocalData(this.url, this.rates);
      this._currenciesSource.next({ ...this.rates });
    } catch (error) {
      console.log('error: ', error);
    }
  }

  public async removeFromCurrentRates(selectedRate) {
    try {
      this.rates[selectedRate.key] = selectedRate.value;
      await this.storageSvc.setLocalData(this.url, this.rates);
      this._currenciesSource.next({ ...this.rates });
    } catch (error) {
      console.log('error: ', error);
    }
  }

  public getRangeDate({ base, compareWith, startDate, endDate }) {
    let url = `https://api.apilayer.com/fixer/timeseries?base=${base}&symbols=${compareWith}&start_date=${startDate}&end_date=${endDate}`;
    return this.http.get<any>(url)
      .pipe(
        switchMap((result: any) => {
          console.log('result', result);
          return result ? of(result.rates) : from(this.storageSvc.getLocalData(url));
        }),
        tap(async (rates) => {
          await this.storageSvc.setLocalData(url, rates);
        }),
        catchError(error => throwError(error))
      );
  }

  public changeFavorite(faveRates) {
    this.faveRates = faveRates;
    this._faveSource.next(faveRates);
  }

  public async updateFavorite() {
    const faveKeys = Object.keys(this.faveRates);
    const mappedFaveRates = {};
    faveKeys.forEach(key => {
      mappedFaveRates[key] = this.rates[key];
    });
    this.updateCurrentRatesWithFavorites();
    this._faveSource.next(mappedFaveRates);
    await this.storageSvc.setLocalData('favorites', mappedFaveRates);
  }

  public updateCurrentRatesWithFavorites() {
    const faveKeys = Object.keys(this.faveRates);
    const baseOpt = { ...this.rates };
    for (let key in baseOpt) {
      if (faveKeys.includes(key)) {
        delete baseOpt[key];
      }
    }
    this.rates = baseOpt;
    this._currenciesSource.next(baseOpt);
  }

  public getFavourites(): Observable<any> {
    return from(this.storageSvc.getLocalData('favorites'))
      .pipe(
        mergeMap((localBookmark) => {
          this.faveRates = { ...localBookmark };
          this._faveSource.next(localBookmark);
          return localBookmark ? of(localBookmark) : of(null);
        })
      );
  }

  public getBaseCurrency() {
    return from(this.storageSvc.getLocalData('base'))
      .pipe(
        switchMap((base) => {
          this.base = (base) ? base : 'USD';
          this._baseSource.next(this.base);
          return this.getBaseCompareLatest(this.base);
        })
      );
  }

  public async setBaseCurrency(base: string) {
    this.base = base;
    this._baseSource.next(base);
    await this.storageSvc.setLocalData('base', base);
  }

  private async setRateSelection(result) {
    if (!result) return;
    this._baseSelections.next(result.rates);
    await this.storageSvc.setLocalData('rate-selection', result.rates);
  }

  private async getRateSelection() {
    const rateSelection = await this.storageSvc.getLocalData('rate-selection');
    this._baseSelections.next(rateSelection);
  }


}
