import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { PersonInterface } from "../models/person-interface";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  fetchPersondata(): Observable<PersonInterface[]> {
    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/json; charset=utf-8"
    );
    return this.http
      .get("http://localhost:5000/api/students", { headers: headers })
      .pipe(map((data: any) => data));
  }

  addPersondata(personData: PersonInterface): Observable<PersonInterface> {
    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/json; charset=utf-8"
    );
    return this.http
      .post(
        "http://localhost:5000/api/students",
        { data: personData },
        {
          headers: headers,
        }
      )
      .pipe(map((data: any) => data));
  }
removePersondata(id: number): Observable<PersonInterface> {
    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/json; charset=utf-8"
    );
    return this.http
      .delete(
        `http://localhost:5000/api/students/${id}`,
        {
          headers: headers,
        }
      )
      .pipe(map((data: any) => data));
  }

}
