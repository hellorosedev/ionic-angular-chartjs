import { AbstractControl } from "@angular/forms";

export function dateValidators(control: AbstractControl) {
  const start = control.get('startDate');
  const end = control.get('endDate');

  return start.value !== null && end.value !== null && start.value < end.value
    ? null : { dateValid: true };
}