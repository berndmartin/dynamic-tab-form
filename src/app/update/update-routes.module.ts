import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UpdateComponent} from './update.component';
import {UpdateListComponent} from './update-list.component';
import {UpdateResolveService} from './update.resolve.service';
import {UserResolveService} from './user-resolve.service';


const UPDATE_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UpdateListComponent,
        resolve: {
          users: UpdateResolveService
        }
      },
      {
        path: ':id',
        component: UpdateComponent,
        resolve: {
          user: UserResolveService
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(UPDATE_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class UpdateRoutesModule {
}
