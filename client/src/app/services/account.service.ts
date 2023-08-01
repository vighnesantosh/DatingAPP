import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs'
import { User } from '../models/user';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  baseUrl = 'https://localhost:5001/api/'

  private currentUserSource = new BehaviorSubject<User | null>(null)

  public currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user);
          console.log(user);
        }
      })
    )
  }
register(model: any)
{
  return this.http.post<User>(this.baseUrl+ 'account/register', model).pipe(
    map(user => {
      if(user){
        localStorage.setItem('user', JSON.stringify(user))
      }
    })
  )
}
  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
