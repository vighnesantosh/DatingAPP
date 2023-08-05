// Make sure there's only one import for Component and keep the OnInit import
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  currentUser$: Observable<User | null> = of(null);

  loggedIn = false

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => this.router.navigateByUrl('/members')
       ,
      error: error => console.log(error)

    })
  }

  logout() {
    this.accountService.logout();
    this.loggedIn = false;
  }

}
