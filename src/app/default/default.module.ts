import {NgModule} from '@angular/core';
import {DefaultRoutesModule} from './default-routes.module';
import {DefaultComponent} from './default.component';


@NgModule({
  imports: [
    DefaultRoutesModule
  ],
  declarations: [
    DefaultComponent
  ]
})

export class DefaultModule {
}
