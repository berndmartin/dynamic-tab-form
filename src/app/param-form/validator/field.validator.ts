import {AbstractControl} from '@angular/forms';
import {ValidationResult} from './validation-result';

export class FieldValidator {

  static notEmptyValidator(control): ValidationResult {
    if (control.value == null || control.value.trim().length === 0) {
      return {
        'notEmpty': true
      };
    }
    return null;
  }

}
