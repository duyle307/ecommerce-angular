import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Error } from '../shared/models/error';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {
  errors: Error;
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.errors = new Error()
  }

  ngOnInit() {
    this.subscription = this.userService
    .purgeAuth()
    .subscribe(
      (data: any) => {
        this.router.navigateByUrl('/')
      },
      (err: any) => {
        this.errors = err.errors;
        console.log(this.errors);
      }
      );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    console.log('destroyed');
  }
}
