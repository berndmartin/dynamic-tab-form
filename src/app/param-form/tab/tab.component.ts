import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html'
})

export class TabComponent {

  @Input() tabTitle: string;
  @Input() subTitle: string;
  @Input() active = false;
  @Input() isCloseable = false;
  @Input() template;
  @Input() dataContext;
  index: number;

  constructor() {
  }

}
