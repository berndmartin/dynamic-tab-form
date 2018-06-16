import {AbstractControl} from '@angular/forms';
import {ValidationResult} from './validation-result';
import {FieldValidator} from './field.validator';

export class RegisterValidator extends FieldValidator {

  static nameLetterValidator(control: AbstractControl): ValidationResult {
    const myRegEx = new RegExp('^([a-zA-Z_0-9-]+)$');

    if (control.value.length > 0 && !myRegEx.test(control.value)) {
      return {
        'nameLetterValidator': true
      };
    }
    return null;
  }

  static passwordRequieresValidator(control: AbstractControl): ValidationResult {
    const myRegEx = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)$');

    if (control.value && control.value.length > 1 && !myRegEx.test(control.value)) {
      return {
        'passwordletter': true
      };
    }
    return null;
  }

  static passwordLetterValidator(control: AbstractControl): ValidationResult {
    const myRegEx = new RegExp('^([a-zA-Z_0-9-\!\“\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\^\{\|\}\~]+)$');

    if (control.value && control.value.length > 1 && !myRegEx.test(control.value)) {
      return {
        'passwordletter': true
      };
    }
    return null;
  }
}
