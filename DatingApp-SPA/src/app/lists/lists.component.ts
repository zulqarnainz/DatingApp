import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { UserService } from "../_services/user.service";
import { ActivatedRoute } from "@angular/router";
import { AlertifyService } from "../_services/alertify.service";
import { User } from "../_models/user";
import { Pagination, PaginatedResult } from "../_models/Pagination";

@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.css"]
})
export class ListsComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParam: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      this.users = routeData["usersListRouteData"].result;
      this.pagination = routeData["usersListRouteData"].pagination;
    });

    this.likesParam = "Likers";
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService
      .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
      .subscribe(
        (usersdata: PaginatedResult<User[]>) => {
          this.users = usersdata.result;
          this.pagination = usersdata.pagination;
        },
        error => {
          this.alertifyService.error(error);
        }
      );
  }

}
