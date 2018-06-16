import { Inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { RegisterService } from '../../register/register.service';

export function StartsWithValidator(letter: string) {
    const key = 'startwith' + letter;

    let debouncer: any;

    return function checkstartsWith(control: AbstractControl) {
        clearTimeout(debouncer);
        return new Promise(resolve => {
            debouncer = setTimeout(() => {
                if (control.value && control.value !== '' && control.value.length > 0) {
                    resolve(control.value.startsWith(letter) ? null : { [key]: true });
                } else {
                    resolve(null);
                }
            }, 0);
        });
    };
}
