import { NgModule } from '@angular/core';

import { TabsComponent } from './tabs.component';
import { TabComponent } from './tab.component';
import { CommonModule } from '@angular/common';
import { TabsDirective } from './tabs.directive';


@NgModule({
    imports: [CommonModule],
    declarations: [
        TabsDirective,
        TabsComponent,
        TabComponent
    ], exports: [
        TabsComponent,
        TabComponent
    ],
    entryComponents: [ TabComponent ]
})
export class TabModule { }
