import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { PersonInterface } from "../models/person-interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private headers = new HttpHeaders().set(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  fetchPersondata(): Observable<PersonInterface[]> {
    return this.http
      .get(`${environment.apiUrl}/students`, { headers: this.headers })
      .pipe(map((data: any) => data));
  }

  addPersondata(personData: PersonInterface): Observable<PersonInterface> {
    return this.http
      .post(
        `${environment.apiUrl}/students`,
        { data: personData },
        {
          headers: this.headers,
        }
      )
      .pipe(map((data: any) => data));
  }
  removePersondata(id: number): Observable<PersonInterface> {
    return this.http
      .delete(`${environment.apiUrl}/students/${id}`, {
        headers: this.headers,
      })
      .pipe(map((data: any) => data));
  }
  updatePersondata(personData: PersonInterface): Observable<PersonInterface> {
    return this.http
      .put(
        `${environment.apiUrl}/students`,
        { data: personData },
        {
          headers: this.headers,
        }
      )
      .pipe(map((data: any) => data));
  }
}
