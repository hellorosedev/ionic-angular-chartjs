import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CurrencyApiService } from '../../services/currency-api.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyCardComponent {
  @Input() type = 'current';
  @Input() currency!: any;
  @Input() base: string = 'USD';
  constructor (
    private storageSvc: StorageService,
    private currencySvc: CurrencyApiService
  ) { }

  async onBookmark(selectedCurrency) {
    const localBookmark = await this.storageSvc.getLocalData('favorites');
    const favoriteLocal = (localBookmark) ? { ...localBookmark } : {};

    const hasExistingKey = favoriteLocal[selectedCurrency.key];

    if (hasExistingKey) {
      delete favoriteLocal[selectedCurrency.key];
      this.currencySvc.removeFromCurrentRates(selectedCurrency);

    } else {
      favoriteLocal[selectedCurrency['key']] = selectedCurrency['value'];
      this.currencySvc.addFromCurrentRates(selectedCurrency);
    }

    this.currencySvc.changeFavorite(favoriteLocal);
    await this.storageSvc.setLocalData('favorites', favoriteLocal);
  }


}
