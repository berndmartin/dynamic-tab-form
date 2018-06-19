import {NgModule} from '@angular/core';

import {UpdateRoutesModule} from './update-routes.module';
import {ParamFormModule} from '../param-form/param-form.module';

import {UpdateComponent} from './update.component';
import {UpdateService} from './update.service';
import {UpdateListComponent} from './update-list.component';
import {UpdateResolveService} from './update.resolve.service';
import {UserResolveService} from './user-resolve.service';


@NgModule({
  imports: [
    UpdateRoutesModule,
    ParamFormModule
  ],
  declarations: [
    UpdateComponent,
    UpdateListComponent
  ],
  providers: [
    UpdateService,
    UpdateResolveService,
    UserResolveService
  ]
})
export class UpdateModule {
}
