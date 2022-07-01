import { StorageService } from './../services/storage.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, from, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CacheInterceptorService implements HttpInterceptor {
  constructor (private storageSvc: StorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') return EMPTY;

    return from(this.getData(req.url))
      .pipe(mergeMap((data) => {
        return data ? of(new HttpResponse<any>(data)) : next.handle(req);
      }));
  }

  private async getData(url) {
    return await this.storageSvc.getLocalData(url);
  }

}
