import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};


  constructor(public authService: AuthService, private alertifyService: AlertifyService,
    private routerService: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertifyService.success('Logged in successfully');
    }, error => {
      if (error === 'object') {
        this.alertifyService.error(error);
      } else {
        this.alertifyService.error('Unauthrized request');
      }

    }, () => {
      this.routerService.navigate(['/members']);
    });
  }

  loggedIn() {
    //   const token = localStorage.getItem('token');
    //   return !!token;
    return this.authService.loggedIn();

  }

  loggedOut() {
    localStorage.removeItem('token');
    this.alertifyService.message('Logged out');
    this.routerService.navigate(['/home']);
  }

}
