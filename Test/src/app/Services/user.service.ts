import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {User} from '../User/User'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public totalStudents = 0;
  public totalStudents$ = new BehaviorSubject<number>(0);
  public id = 0
  public user1 ='';
  public name =''
  public pass =''
  constructor() {}

  public setTotalStudents(total: number) {
    this.totalStudents = total;
    this.totalStudents$.next(total);
  }

  public increamentStudent() {
    this.totalStudents++;
    this.totalStudents$.next(this.totalStudents);
  }
}
