import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ControllerService } from '../../services/controller.service';
import { dateValidators } from './date-validator';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangeComponent implements OnDestroy {
  @Input() title!: string;
  @Output() startDateChange = new EventEmitter<string>();
  @Output() endDateChange = new EventEmitter<string>();
  public dateForm: FormGroup;
  private formSubscribe: Subscription;

  constructor (
    private controllerSvc: ControllerService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.dateForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    }, { validator: dateValidators });
  }

  ngAfterViewInit(): void {
    this.formSubscribe = this.dateForm.valueChanges.subscribe((value: any) => {
      this.getChangeDate(value);
    });
  }

  public getChangeDate({ startDate, endDate }) {
    if (startDate > endDate && endDate) {
      return this.controllerSvc.presentAlert(
        'Start date should NOT exceed with End date value'
      );
    }

    if (this.dateForm.invalid) return;
    startDate = startDate?.split('T')[0];
    endDate = endDate?.split('T')[0];

    this.sendStartDate(startDate);
    this.sendEndDate(endDate);
  }

  private sendStartDate(date) {
    this.startDateChange.emit(date);
  }

  private sendEndDate(date) {
    this.endDateChange.emit(date);
  }

  ngOnDestroy() {
    if (this.formSubscribe) this.formSubscribe.unsubscribe();
  }

}
