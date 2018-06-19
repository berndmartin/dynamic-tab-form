import {Injectable} from '@angular/core';

import {DropdownQuestion} from './question-dropdown';
import {QuestionBase} from './question-base';
import {TextboxQuestion} from './question-textbox';
import {CheckboxQuestion} from './question-checkbox';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable()
export class QuestionService {
  private questionBox = {
    'DropdownQuestion': DropdownQuestion,
    'TextboxQuestion': TextboxQuestion,
    'CheckboxQuestion': CheckboxQuestion
  };

  constructor(private http: HttpClient) {
  }

  private getFields(formName: string) {
    return this.http.get(`/assets/form_${formName}.json`);
  }

  getTabs(formName: string, values: object = {}) {

    function groupBy(xs, f) {
      return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
    }

    return Observable.create(observer => {
      this.getFields(formName)
        .subscribe(res => {
          const ntabs = res['tabs'].sort((a, b) => a.order - b.order);

          // get fields
          const fieldsByTabGroup = groupBy(res['fields'], (field) => field.tabGroup);

          ntabs.forEach((tab, idx) => {
            tab.questions = fieldsByTabGroup[idx]
              .map(field => {
                field.value = values.hasOwnProperty(field.key) ? values[field.key] : '';
                return new this.questionBox[field.controlType](field);
              });
          });
          observer.next(ntabs);
          observer.complete();
        });
    });
  }
}
