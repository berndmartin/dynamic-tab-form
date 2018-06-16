import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {QuestionBase} from './question-base';

import {RegisterValidator} from '../validator/register.validator';
import {MatchOtherValidator} from '../validator/match-other.validator';
import {BlackListValidator} from '../validator/black-list.validator';
import {StartsWithValidator} from '../validator/starts-with.validator';


@Injectable()
export class QuestionControlService {
  constructor() {
  }

  private getValidators(validatoren) {
    const val = [];
    validatoren.forEach((validatores) => {
      const valy = validatores.split(':');
      switch (valy[0]) {
        case 'requiredTrue':
          val.push(Validators.requiredTrue);
          break;
        case 'required':
          val.push(Validators.required);
          break;
        case 'email':
          val.push(Validators.email);
          break;
        case 'minLength':
          val.push(Validators.minLength(parseInt(valy[1], 10)));
          break;
        case 'maxLength':
          val.push(Validators.maxLength(parseInt(valy[1], 10)));
          break;
        case 'pattern':
          val.push(Validators.pattern(valy[1]));
          break;
        case 'notEmptyValidator':
          val.push(RegisterValidator.notEmptyValidator);
          break;
        case 'RegisterValidator':
          val.push(RegisterValidator[valy[1]]);
          break;
        case 'BlackListValidator':
          val.push(BlackListValidator('firstname', 'lastname', 'email'));
          break;
        case 'MatchOtherValidator':
          val.push(MatchOtherValidator(valy[1]));
          break;
        case 'StartsWithValidator':
          val.push(StartsWithValidator(valy[1]));
          break;
        default:
          throw new Error('Unkonw validator ' + valy[0]);
      }
    });
    return val;
  }

  toFormGroup(questions: QuestionBase<any>[]) {
    const group: any = {};

    questions.forEach(question => {
      if (question.required && !question.syncValidators.includes('required')) {
        question.syncValidators.push('required');
      }

      group[question.key] = new FormControl(
        question.value || '',
        Validators.compose(this.getValidators(question.syncValidators)),
        Validators.composeAsync(this.getValidators(question.asyncValidators))
      );

    });
    return new FormGroup(group);
  }
}
