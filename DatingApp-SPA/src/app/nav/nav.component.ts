import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(
    public authService: AuthService,
    private alertifyService: AlertifyService,
    private routerService: Router
  ) {}

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => {
      this.photoUrl = photoUrl;
    } );
  }

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.alertifyService.success("Logged in successfully");
      },
      error => {
        if (error === "object") {
          this.alertifyService.error(error);
        } else {
          this.alertifyService.error("Unauthrized request");
        }
      },
      () => {
        this.routerService.navigate(["/members"]);
      }
    );
  }

  loggedIn() {
    //   const token = localStorage.getItem('token');
    //   return !!token;
    return this.authService.loggedIn();
  }

  loggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.authService.currentUser = null;
    this.authService.decodedToken = null;
    this.alertifyService.message("Logged out");
    this.routerService.navigate(["/home"]);
  }
}
