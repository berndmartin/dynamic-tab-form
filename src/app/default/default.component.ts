import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
})
export class DefaultComponent {
  constructor(private router: Router) {
  }

  private goTo(direction) {
    this.router.navigate(['./' + direction], {});
  }
}
