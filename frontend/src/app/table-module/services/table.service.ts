import { Observable, map, BehaviorSubject, tap } from "rxjs";
import { PersonInterface } from "./../../models/person-interface";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppStateInterface } from "src/app/types/appState.interface";
import { select, Store } from "@ngrx/store";
import * as personActions from "../../store/actions/personAction";
import {
  errSelector,
  isLoadingSelector,
  personDataSelector,
} from "./../../store/selectors/personSelector";


@Injectable({
  providedIn: "root",
})
export class TableService extends BehaviorSubject<PersonInterface[]> {
  constructor(
    private store: Store<AppStateInterface>,
  ) {
    super([]);
  }

  private data: PersonInterface[] = [];

  // public read(): void {
  //   if (this.data.length) {
  //     return super.next(this.data);
  //   }
  //   this.store.dispatch(personActions.getPersonstart());
  //   this.store
  //     .select(personDataSelector)
  //     .pipe(
  //       tap((data) => {
  //         this.data = data;
  //       })
  //     )
  //     .subscribe((data) => {
  //       super.next(data);
  //     });

  // }

  public save(personData: PersonInterface, isNew?: boolean): void {
   
    this.reset();
    this.store.dispatch(personActions.addPersonstart({ personData }));
  }

  public remove(PersonID: number): void {
    this.reset();

    this.store.dispatch(personActions.deletePersonstart({ PersonID }));
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

}
