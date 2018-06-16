import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


@Injectable()
export class RegisterService {

  public registerUser(values: any) {
    return Observable.create(observer => {
      console.log(values);
      observer.next('register');
      observer.complete();
    });
  }
}
