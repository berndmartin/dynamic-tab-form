import {Inject, Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {environment} from '../../../environments/environment';


export function BlackListValidator(...otherControls) {
  let debouncer: any;
  const blacklist = Object.assign([], environment.BLACKLIST).map(value => {
    return value.toLowerCase();
  });

  return function checkBlacklist(control: AbstractControl) {
    clearTimeout(debouncer);

    return new Promise(resolve => {
      debouncer = setTimeout(() => {
        const newBl = Object.assign([], blacklist);

        otherControls.map(ocName => {
          const otherControl = control.parent.get(ocName) as AbstractControl;
          if (!otherControl) {
            throw new Error('BlackListValidator(): other control is not found in parent group');
          }
          newBl.push(otherControl.value.toLowerCase());
        });
        const p = control.value.toLowerCase();

        if (newBl.indexOf(p) > -1 || newBl.some(black => black.indexOf(p) > -1)) {
          resolve({'blackListValidator': true});
        } else {
          resolve(null);
        }
      }, 800);
    });
  };
}
