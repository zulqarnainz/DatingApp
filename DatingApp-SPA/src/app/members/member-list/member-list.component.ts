import { Component, OnInit } from "@angular/core";
import { User } from "../../_models/user";
import { UserService } from "../../_services/user.service";
import { AlertifyService } from "../../_services/alertify.service";
import { ActivatedRoute } from "@angular/router";
import { Pagination, PaginatedResult } from "src/app/_models/Pagination";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"]
})
export class MemberListComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem("user"));
  genderList = [
    { value: "male", display: "Male" },
    { value: "female", display: "Female" }
  ];
  userParams: any = {};
  pagination: Pagination;

  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.loadUsers();

    this.route.data.subscribe(data => {
      this.users = data["usersRouteData"].result;
      this.pagination = data["usersRouteData"].pagination;
    });

    this.userParams.gender = this.user.gender === "female" ? "male" : "female";
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = "lastActive";
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
  resetFilters() {
    this.userParams.gender = this.user.gender === "female" ? "male" : "female";
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;

    this.loadUsers();
  }

  loadUsers() {
    this.userService
      .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
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
