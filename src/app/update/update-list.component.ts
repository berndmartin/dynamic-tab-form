import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../param-form/question/question.service';
import {DynamicTabsComponent} from '../param-form/dynamic-tabs/dynamic-tabs.component';

import {UpdateService} from './update.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Users} from '../user';

@Component({
  selector: 'app-update-list',
  templateUrl: './update-list.component.html',
  providers: [QuestionService]
})
export class UpdateListComponent implements OnInit {

  list;
  selectedUser = null;

  constructor(
    private updateService: UpdateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  selectUser(id) {
    this.router.navigate(['/update', id]);
  }

  ngOnInit() {
    this.route.data.subscribe((data: {users: Users}) => {
      this.list = data.users;
    });
  }
}
