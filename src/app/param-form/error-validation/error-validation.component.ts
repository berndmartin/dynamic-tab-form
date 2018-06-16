import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-error-validation',
  templateUrl: './error-validation.component.html'
})
export class ErrorValidationComponent {
  @Input() field: any;
  @Input() validator: any;
  @Input() currentValue: any;
}
