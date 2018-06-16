import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../param-form/question/question.service';
import {DynamicTabsComponent} from '../param-form/dynamic-tabs/dynamic-tabs.component';

import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {debug} from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  questiontabs: any[] = null;

  constructor(
    private loginService: LoginService,
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
      this.loginService
        .loginUser(formValues.formValues)
        .subscribe(res => this.handleSuccessRegister(res), err => this.handleErrorRegister(err));
    }
  }

  ngOnInit() {
    this.questionService
      .getTabs('login')
      .subscribe(data => {
        this.questiontabs = data;
      });
  }
}
