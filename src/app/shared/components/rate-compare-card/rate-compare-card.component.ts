import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-rate-compare-card',
  templateUrl: './rate-compare-card.component.html',
  styleUrls: ['./rate-compare-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RateCompareCardComponent {
  @Input() compareWith!: string;
  @Input() baseCurrency!: string;
  @Input() rateCompared!: string;
}
