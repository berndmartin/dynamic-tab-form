import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class LoginService {


  public loginUser(values: any) {
    return Observable.create(observer => {
      console.log(values);
      observer.next('login');
      observer.complete();
    });
  }
}
