import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appDynamicTabs]'
})

export class TabsDirective {
  constructor(public viewContainer: ViewContainerRef) {
  }
}
