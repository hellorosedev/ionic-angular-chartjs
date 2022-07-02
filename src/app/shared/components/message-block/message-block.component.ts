import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-block',
  templateUrl: './message-block.component.html',
  styleUrls: ['./message-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageBlockComponent {
  @Input() message!: string;

}
