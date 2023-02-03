import {
  errSelector,
  isLoadingSelector,
  personDataSelector,
} from "./../../../store/selectors/personSelector";
import { Observable } from "rxjs";
import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  GridComponent,
  GridDataResult,
  CancelEvent,
  EditEvent,
  RemoveEvent,
  SaveEvent,
  AddEvent,
} from "@progress/kendo-angular-grid";
import { State, process } from "@progress/kendo-data-query";
import { first, map, toArray } from "rxjs/operators";
import {  PersonInterface } from "src/app/models/person-interface";
import { AppStateInterface } from "src/app/types/appState.interface";
import { select, Store } from "@ngrx/store";
import * as personActions from "../../../store/actions/personAction";
import { durationInYears } from "@progress/kendo-date-math";
import { Socket } from "ngx-socket-io";
import { NotificationService } from "@progress/kendo-angular-notification";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10,
  };
  public view: Observable<GridDataResult> | undefined;
  error$: Observable<string | null>;
  isLoading$: Observable<boolean>;
  public data: PersonInterface[] = [];
  private editedRowIndex: number | undefined;
  public formGroup: FormGroup | undefined;
  public maxDate: Date = new Date(2004, 12, 31);

  constructor(
    private store: Store<AppStateInterface>,
    private socket: Socket,
    private notificationService: NotificationService
  ) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errSelector));

    this.socket.on("connect", () => {
      console.log("connected");
    });
    this.socket.on("disconnect", () => {
      console.log("disconnected");
    });
    this.socket.on("notification", (data: any) => {
      this.notification(data);
    });
  }

  ngOnInit(): void {
    this.store.dispatch(personActions.getPersonstart());
    this.view = this.store.pipe(
      select(personDataSelector),
      map((data) => process(data, this.gridState))
    );
  }

  public notification(data: string): void {
    this.notificationService.show({
      content: `${data}`,
      cssClass: "button-notification",
      animation: { type: "slide", duration: 200 },
      position: { horizontal: "right", vertical: "top" },
      type: { style: "success", icon: true },
      hideAfter: 2000,
    });
  }

  public addHandler(args: AddEvent): void {
    // define all editable fields validators and default values
    this.closeEditor(args.sender);
    this.formGroup = new FormGroup({
      PersonName: new FormControl("", Validators.required),
      PersonGender: new FormControl("", Validators.required),
      PersonAddress: new FormControl("", Validators.required),
      PersonMobileNo: new FormControl("", Validators.required),
      DateOfBirth: new FormControl(new Date(), Validators.required),
    });
    // show the new row editor, with the `FormGroup` build above
    args.sender.addRow(this.formGroup);
  }

  public editHandler(args: EditEvent): void {
    // define all editable fields validators and default values
    const { dataItem } = args;
    this.closeEditor(args.sender);
    this.formGroup = new FormGroup({
      PersonName: new FormControl(
        dataItem.PersonName,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-z]{5,15}"),
        ])
      ),
      PersonGender: new FormControl(dataItem.PersonGender, Validators.required),
      PersonAddress: new FormControl(
        dataItem.PersonAddress,
        Validators.required
      ),
      PersonMobileNo: new FormControl(
        dataItem.PersonMobileNo,
        Validators.required
      ),
      DateOfBirth: new FormControl(
        new Date(dataItem.DateOfBirth),
        Validators.compose([Validators.required, this.ageValidator])
      ),
    });

    this.editedRowIndex = args.rowIndex;
    // put the row in edit mode, with the `FormGroup` build above
    args.sender.editRow(args.rowIndex, this.formGroup);
  }

  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    // close the editor
    grid.closeRow(rowIndex);
    // reset the helpers
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
  public saveHandler({
    sender,
    rowIndex,
    formGroup,
    isNew,
    dataItem,
  }: SaveEvent): void {
    const personData: PersonInterface = formGroup.value;
    if (dataItem.PersonID) {
      personData.PersonID = dataItem.PersonID;
    }
    //this.editService.save(personData, isNew);
    if (isNew) {
      this.store.dispatch(personActions.addPersonstart({ personData }));
    } else {
      this.store.dispatch(personActions.updatePersonstart({ personData }));
    }
    sender.closeRow(rowIndex);
  }
  public removeHandler(args: RemoveEvent): void {
    // remove the current dataItem from the current data source, and close the row
    //this.editService.remove(args.dataItem.PersonID);
    this.store.dispatch(
      personActions.deletePersonstart({ PersonID: args.dataItem.PersonID })
    );
  }

  public cancelHandler(args: CancelEvent): void {
    // close the editor for the given row
    this.closeEditor(args.sender, args.rowIndex);
  }

  public onStateChange(state: State): void {
    this.gridState = state;
    this.store.dispatch(personActions.getPersonstart());
    // this.editService.read();
  }
  protected ageCalculator(birthday: string): number {
    const start = new Date(birthday);
    const end = new Date();
    return durationInYears(start, end);
  }
  protected ageValidator = (control: FormControl) => {
    const birthdate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    if (age < 18) {
      return { age: "Age must be more than 18" };
    }
    return null;
  };
}
