import { Observable, map, BehaviorSubject, tap } from "rxjs";
import { PersonInterface } from "./../../models/person-interface";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const CREATE_ACTION = "create";
const UPDATE_ACTION = "update";
const REMOVE_ACTION = "destroy";

@Injectable({
  providedIn: "root",
})
export class TableService extends BehaviorSubject<PersonInterface[]> {
  constructor(private http: HttpClient) {
    super([]);
  }

  private data: PersonInterface[] = [];

  public read(): void {
    if (this.data.length) {
      return super.next(this.data);
    }

    this.fetch()
      .pipe(
        tap((data: PersonInterface[]) => {
          this.data = data;
        })
      )
      .subscribe((data) => {
        super.next(data);
      });
  }

  public save(data: PersonInterface[], isNew?: boolean): void {
    const action = isNew ? CREATE_ACTION : UPDATE_ACTION;

    this.reset();

    this.fetch(action, data).subscribe(
      () => this.read(),
      () => this.read()
    );
  }

  public remove(data: PersonInterface[]): void {
    this.reset();

    this.fetch(REMOVE_ACTION, data).subscribe(
      () => this.read(),
      () => this.read()
    );
  }

  public resetItem(dataItem: PersonInterface): void {
    if (!dataItem) {
      return;
    }

    // find orignal data item
    const originalDataItem = this.data.find(
      (item) => item.PersonID === dataItem.PersonID
    );

    // revert changes

    originalDataItem && Object.assign(originalDataItem, dataItem);

    super.next(this.data);
  }

  private reset() {
    this.data = [];
  }

  private fetch(action = "", data?: PersonInterface[]): Observable<PersonInterface[]> {
    return this.http
      .jsonp(
        `https://demos.telerik.com/kendo-ui/service/Products/${action}?${this.serializeModels(
          data
        )}`,
        "callback"
      )
      .pipe(map((res) => <PersonInterface[]>res));
  }

  private serializeModels(data?: PersonInterface[]): string {
    return data ? `&models=${JSON.stringify([data])}` : "";
  }

  fetchPersondata(): Observable<PersonInterface[]> {
    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/json; charset=utf-8"
    );
    return this.http
      .get("http://localhost:5000/api/students", { headers: headers })
      .pipe(map((data: any) => data));
  }
}
