import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../_models/user";

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

  getUsers(): Observable<User[]> {
    // return this.http.get<User[]>(this.baseUrl + 'users', httpOptions);

    return this.http.get<User[]>(this.baseUrl + "users");
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
}
