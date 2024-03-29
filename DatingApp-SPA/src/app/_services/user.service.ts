import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../_models/user";
import { PaginatedResult } from "../_models/Pagination";
import { map } from "rxjs/operators";

// removed the httpOptions and also not passing it with every api calls manually.
// as we are using auht0/jwt-Module for automatically sending the jwt token in every request.

// const httpOptions = {
//   headers: new HttpHeaders({
//     'authorization':  'bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: "root"
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(
    page?,
    itemsPerPage?,
    userParams?,
    likeParams?
  ): Observable<PaginatedResult<User[]>> {
    // return this.http.get<User[]>(this.baseUrl + 'users', httpOptions);

    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<
      User[]
    >();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }

    if (userParams != null) {
      params = params.append("minAge", userParams.minAge);
      params = params.append("maxAge", userParams.maxAge);
      params = params.append("gender", userParams.gender);
      params = params.append("orderBy", userParams.orderBy);
    }

    if (likeParams === "Likers") {
      params = params.append("Likers", "true");
    }

    if (likeParams === "Likees") {
      params = params.append("Likees", "true");
    }

    return this.http
      .get<User[]>(this.baseUrl + "users", { observe: "response", params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get("pagination") != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get("pagination")
            );
          }
          return paginatedResult;
        })
      );
  }

  getUser(id): Observable<User> {
    // return this.http.get<User>(this.baseUrl + 'users/' + id, httpOptions);

    return this.http.get<User>(this.baseUrl + "users/" + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + "users/" + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(
      this.baseUrl + "users/" + userId + "/photos/" + id + "/setMain",
      {}
    );
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + "users/" + userId + "/photos/" + id);
  }

  sendLike(id: number, recepientId: number) {
    return this.http.post(
      this.baseUrl + "users/" + id + "/like/" + recepientId,
      {}
    );
  }
}
