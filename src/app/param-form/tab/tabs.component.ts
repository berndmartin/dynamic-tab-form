import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input,
  OnChanges,
  SimpleChange,
  ViewChild,
  ViewEncapsulation,
  ComponentFactoryResolver,
  ViewContainerRef
} from '@angular/core';
import {TabComponent} from './tab.component';
import {TabsDirective} from './tabs.directive';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styles: ['div.active { cursor: pointer; }']
})

export class TabsComponent implements AfterContentInit, OnChanges {
  public title: string;
  public subbtitle: string;
  public currentTabIdx: number;
  public mergedTabs: TabComponent[] = [];
  private dynamicTabs: TabComponent[] = [];

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @ViewChild(TabsDirective) dynamicTabPlaceholder: TabsDirective;
  @Input() selectedId: number;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngAfterContentInit() {
    this.mergeTabs();
    const activeTabs = this.mergedTabs.filter((tab) => tab.active);
    if (activeTabs.length === 0) {
      this.selectTab(this.mergedTabs[0]);
    }
  }

  selectTab(tab: TabComponent) {
    this.mergedTabs.forEach(t => t['active'] = false);
    if (tab) {
      tab.active = true;
      this.title = tab.tabTitle || '';
      this.subbtitle = tab.subTitle || '';
      this.currentTabIndex();
    }
  }

  currentTabIndex() {
    this.currentTabIdx = this.mergedTabs.findIndex(x => x.active === true);
  }

  selectTabTitle(title: string) {
    const activeTab = this.mergedTabs.filter((tab) => tab.tabTitle === title);
    this.selectTab(activeTab[0]);
  }

  selectTabById(id: number) {
    try {
      this.selectTab(this.mergedTabs[id]);
    } catch (err) {
      throw new Error(err);
    }
  }

  ngOnChanges(changes: { [propName: number]: SimpleChange }): void {
    const selectedId = changes['selectedId'].currentValue;
    if (selectedId !== null) {
      this.selectTabById(Math.abs(selectedId));
    }
  }

  openTab(title: string, subbtitle: string, index: number, template, data, isCloseable = false, openNewTab = false) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TabComponent);
    const viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
    const componentRef = viewContainerRef.createComponent(componentFactory);
    const instance: TabComponent = componentRef.instance as TabComponent;

    instance.tabTitle = title;
    instance.subTitle = subbtitle;
    instance.template = template;
    instance.active = false;
    instance.dataContext = data;
    instance.isCloseable = isCloseable;
    instance.index = index;

    this.dynamicTabs.push(componentRef.instance as TabComponent);
    this.mergeTabs();

    if (openNewTab) {
      this.selectTab(this.mergedTabs[this.mergedTabs.length - 1]);
    }
  }

  closeTab(tab: TabComponent) {
    for (let i = 0; i < this.dynamicTabs.length; i++) {
      if (this.dynamicTabs[i] === tab) {
        this.dynamicTabs.splice(i, 1);
        const viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
        viewContainerRef.remove(i);
        this.mergeTabs();
        if (this.mergedTabs.length > 0) {
          this.selectTab(this.mergedTabs[0]);
        }
        break;
      }
    }
  }

  closeTabByTitle(title: string) {
    const closeTabTitle = this.dynamicTabs.filter(x => x.tabTitle === title);
    this.closeTab(closeTabTitle[0]);
  }

  closeActiveTab() {
    const activeTabs = this.dynamicTabs.filter((tab) => tab.active);
    if (activeTabs.length > 0) {
      this.closeTab(activeTabs[0]);
    }
  }

  public mergeTabs() {
    this.mergedTabs = [].concat(this.tabs ? this.tabs.toArray() : [], this.dynamicTabs);
  }
}
