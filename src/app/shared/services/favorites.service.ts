import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of, EMPTY, Observable, from } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(
    private storageSvc: StorageService
  ) { }

/*   public getFavourites(): Observable<any> {
    return from(this.storageSvc.getLocalData('favorites'))
      .pipe(
        mergeMap((localBookmark) => {
          console.log('localBookmark', localBookmark);
          return localBookmark ? of(localBookmark) : EMPTY;
        })
      )
  } */
}
