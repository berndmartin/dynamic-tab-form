import {NgModule} from '@angular/core';

import {TabModule} from './tab/tab.module';

import {DynamicFormComponent} from './dynamic-form/dynamic-form.component';
import {DynamicFormQuestionComponent} from './dynamic-form-question/dynamic-form-question.component';
import {DynamicTabsComponent} from './dynamic-tabs/dynamic-tabs.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {QuestionService} from './question/question.service';
import {ErrorValidationComponent} from './error-validation/error-validation.component';


@NgModule({
  imports: [
    TabModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  declarations: [
    DynamicTabsComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    ErrorValidationComponent
  ],
  exports: [
    DynamicTabsComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    QuestionService
  ]
})
export class ParamFormModule {
}
