import {NgModule} from '@angular/core';

import {RegisterRoutesModule} from './register-routes.module';
import {ParamFormModule} from '../param-form/param-form.module';

import {RegisterComponent} from './register.component';
import {RegisterService} from './register.service';


@NgModule({
  imports: [
    RegisterRoutesModule,
    ParamFormModule
  ],
  declarations: [
    RegisterComponent
  ],
  providers: [
    RegisterService
  ]
})
export class RegisterModule {
}
