import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {UpdateService} from './update.service';
import {Users} from '../user';


@Injectable()
export class UpdateResolveService implements Resolve<any> {

  constructor(
    private updateService: UpdateService,
    private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | boolean {
    return this.updateService.getList();
  }
}
