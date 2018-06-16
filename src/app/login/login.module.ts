import {NgModule} from '@angular/core';

import {LoginRoutesModule} from './login-routes.module';
import {ParamFormModule} from '../param-form/param-form.module';

import {LoginComponent} from './login.component';
import {LoginService} from './login.service';


@NgModule({
  imports: [
    LoginRoutesModule,
    ParamFormModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule {
}
