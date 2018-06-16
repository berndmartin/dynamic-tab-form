import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {QuestionBase} from '../question/question-base';
import {QuestionControlService} from '../question/question-control.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  @Input() buttonnext: string;
  @Input() dynamicTabId: number;
  @Output() nextTab = new EventEmitter<any>();

  form: FormGroup;
  public env = environment;

  constructor(
    private qcs: QuestionControlService
  ) {
  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  checkForm() {
    return (this.form.valid && !this.form.pending);
  }

  onSubmit() {
    if (this.checkForm()) {
      this.nextTab.emit({tabid: this.dynamicTabId, formValue: this.form.value});
    }
  }
}
