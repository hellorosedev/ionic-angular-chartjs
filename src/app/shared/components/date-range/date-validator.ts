import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";

export class DateValidators {
  static minDate(control: AbstractControl): any | null {
    const start = control.get('startDate');
    const end = control.get('endDate');
    return start.value !== null && end.value !== null && start.value < end.value
      ? null : { dateValid: true };
  }
}


export function dateValidators(control: AbstractControl) {
  const start = control.get('startDate');
  const end = control.get('endDate');

  return start.value !== null && end.value !== null && start.value < end.value
    ? null : { dateValid: true };


  // carry out the actual date checks here for is-endDate-after-startDate
  // if valid, return null,
  // if invalid, return an error object (any arbitrary name), like, return { invalidEndDate: true }
  // make sure it always returns a 'null' for valid or non-relevant cases, and a 'non-null' object for when an error should be raised on the formGroup
}