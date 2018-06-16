import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../param-form/question/question.service';
import {DynamicTabsComponent} from '../param-form/dynamic-tabs/dynamic-tabs.component';

import {RegisterService} from './register.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [QuestionService]
})
export class RegisterComponent implements OnInit {

  questiontabs: any[] = null;

  constructor(
    private registerService: RegisterService,
    private questionService: QuestionService,
    private router: Router
  ) {
  }

  private handleSuccessRegister(result) {
    this.router.navigate(['./default'], {});
  }

  private handleErrorRegister(error) {
    throw new Error(error);
  }

  lastTab(formValues: any) {
    if (formValues.lastTab) {
      this.registerService
        .registerUser(formValues.formValues)
        .subscribe(res => this.handleSuccessRegister(res), err => this.handleErrorRegister(err));
    }
  }

  ngOnInit() {
    this.questionService
      .getTabs('register')
      .subscribe(data => {
        this.questiontabs = data;
      });

  }
}
