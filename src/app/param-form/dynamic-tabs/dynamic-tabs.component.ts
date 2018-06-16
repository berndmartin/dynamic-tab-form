import {
  Component,
  Input,
  OnInit,
  ViewChild,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {QuestionControlService} from '../question/question-control.service';

import {Observable} from 'rxjs';
import {TabComponent} from '../tab/tab.component';
import {TabsComponent} from '../tab/tabs.component';

@Component({
  selector: 'app-dynamic-tabs',
  templateUrl: './dynamic-tabs.component.html',
  providers: [QuestionControlService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTabsComponent implements OnInit, OnDestroy {

  @Input() questiontabs: Observable<any[]>;

  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild('appDynamicForm') appDynamicFormTemplate;
  @Output() lastTab = new EventEmitter<any>();

  selectedId: number;
  tabArray: any;
  formValues = {};

  constructor(
    private qcs: QuestionControlService,
    private cd: ChangeDetectorRef
  ) {
  }

  private createTabs(tabs) {
    this.tabArray = tabs.map(tab => {
      this.tabsComponent.openTab(
        tab.title,
        tab.subtitle,
        tab.id,
        this.appDynamicFormTemplate,
        {
          questions: tab.questions,
          buttonnext: tab.buttonnext,
          dynamicTabId: tab.id
        }
      );
    });
  }

  private removeTabs(tabs) {
    tabs.map(tab => {
      this.tabsComponent.closeTabByTitle(tab.title);
    });
  }

  nextTab(formValue: any) {
    this.formValues = Object.assign(this.formValues, formValue.formValue);
    if (this.tabArray.length > formValue.tabid + 1) {
      this.selectedId = (formValue.tabid + 1 === this.selectedId ? -1 : 1 ) * (formValue.tabid + 1);
    } else {
      this.lastTab.emit({lastTab: true, formValues: this.formValues});
    }
  }

  ngOnInit() {
    this.createTabs(this.questiontabs);
  }

  ngOnDestroy() {
    this.removeTabs(this.questiontabs);
  }
}
