import {AbstractControl} from '@angular/forms';

export function MatchOtherValidator(otherControlName: string) {

  let thisControl: AbstractControl;
  let otherControl: AbstractControl;

  return function matchOtherValidate(control: AbstractControl) {

    if (!control.parent) {
      return null;
    }

    // Initializing the validator.
    if (!thisControl) {
      thisControl = control;
      otherControl = control.parent.get(otherControlName) as AbstractControl;
      if (!otherControl) {
        throw new Error('matchOtherValidator(): other control is not found in parent group');
      }
      otherControl.valueChanges.subscribe(() => {
        thisControl.updateValueAndValidity();
      });
    }

    if (!otherControl) {
      return null;
    }

    if (otherControl.value !== thisControl.value) {
      return {
        'matchOther': true
      };
    }
    return null;
  };
}
