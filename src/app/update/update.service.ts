import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class UpdateService {
  users;

  constructor(private http: HttpClient) {
  }

  public getUserPerId(id) {
    return this.users.filter(user => user.id === id)[0];
  }

  public getList() {
    return Observable.create(observer => {
      if (this.users && this.users.length) {
        observer.next(this.users);
        observer.complete();
      } else {
        this.loadList().subscribe(users => {
          this.users = users;
          observer.next(this.users);
          observer.complete();
        });
      }
    });
  }

  private loadList() {
    return this.http.get(`/assets/list_update.json`);
  }

  public addUser(values: any) {
    return Observable.create(observer => {
      this.getList().subscribe(list => {
        values.id = list.slice(-1)[0].id + 1;
        this.users.push(values);
        observer.next('add');
        observer.complete();
      });
    });
  }

  public updateUser(values: any) {
    return Observable.create(observer => {
      const userIdx = this.users.findIndex(us => us.id === values.id);
      this.users[userIdx] = Object.assign(this.users[userIdx], values);
      observer.next('update');
      observer.complete();
    });
  }

  public getUser(id) {
    return Observable.create(observer => {
      this.getList().subscribe(list => {
        observer.next(this.users.filter(user => user.id === Number.parseInt(id, 10))[0]);
        observer.complete();
      });
    });
  }

}
