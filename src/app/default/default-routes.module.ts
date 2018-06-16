import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DefaultComponent} from './default.component';

const DEFAULT_ROUTES: Routes = [
  {
    path: '',
    component: DefaultComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(DEFAULT_ROUTES)
  ]
})

export class DefaultRoutesModule {
}
