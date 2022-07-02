import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubHeaderComponent {
  @Input() compareWith: string = '';
  @Input() baseCurrency: string = '';

}
