import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {QuestionService} from '../param-form/question/question.service';
import {DynamicTabsComponent} from '../param-form/dynamic-tabs/dynamic-tabs.component';

import {UpdateService} from './update.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../user';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  providers: [QuestionService]
})
export class UpdateComponent implements OnInit {

  usertabs: any[] = null;
  user: any;

  constructor(
    private updateService: UpdateService,
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  private handleSuccessUpdate(result) {
    this.router.navigate(['./update'], {});
  }

  private handleErrorUpdate(error) {
    throw new Error(error);
  }

  lastTab(formValues: any) {
    if (formValues.lastTab) {
      this.updateService
        .updateUser( Object.assign(this.user, formValues.formValues))
        .subscribe(res => this.handleSuccessUpdate(res), err => this.handleErrorUpdate(err));
    }
  }

  ngOnInit() {
    this.route.data.subscribe((data: {user: User}) => {
      this.user = data.user;
      this.questionService
        .getTabs('update', this.user)
        .subscribe(tabs => {
          this.usertabs = tabs;
        });
    });
  }

}
