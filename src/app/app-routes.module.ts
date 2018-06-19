import {NgModule} from '@angular/core';
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const APP_ROUTES: Routes = [
  {
    path: 'default',
    loadChildren: './default/default.module#DefaultModule'
  }, {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
  }, {
    path: 'register',
    loadChildren: './register/register.module#RegisterModule',
  }, {
    path: 'update',
    loadChildren: './update/update.module#UpdateModule',
  }, {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      APP_ROUTES
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutesModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppRoutesModule
    };
  }
}
