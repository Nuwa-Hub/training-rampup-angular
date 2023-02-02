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
import { first, map } from "rxjs/operators";
import { sampleData } from "../../helpers/sampleProducts";
import { PersonInterface } from "src/app/models/person-interface";
import { AppStateInterface } from "src/app/types/appState.interface";
import { select, Store } from "@ngrx/store";
import * as personActions from "../../../store/actions/personAction";
import { TableService } from "../../services/table.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  public view: PersonInterface[] = [];
  personData$: Observable<PersonInterface[]>;
  error$: Observable<string | null>;
  isLoading$: Observable<boolean>;
  public data: PersonInterface[] = [];
  private editedRowIndex: number | undefined;
  public formGroup: FormGroup | undefined;
  private editService: TableService;

  public gridState: State = {
    sort: [],
    skip: 0,
    take: 5,
  };

  constructor(
    private store: Store<AppStateInterface>,
    @Inject(TableService) editServiceFactory: () => TableService
  ) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errSelector));
    this.personData$ = this.store.pipe(select(personDataSelector));
    this.editService = editServiceFactory();
  }

  ngOnInit(): void {
    this.store.dispatch(personActions.getPersonstart());
    this.personData$.pipe(first()).subscribe((val) => (this.data = val));
  }

  public addHandler(args: AddEvent): void {
    // define all editable fields validators and default values
    this.formGroup = new FormGroup({
      PersonName: new FormControl("", Validators.required),
      PersonGender: new FormControl("", Validators.required),
      PersonAddress: new FormControl("", Validators.required),
      PersonMobileNo: new FormControl("", Validators.required),
      DateOfBirth: new FormControl("", Validators.required),
    });
    // show the new row editor, with the `FormGroup` build above
    args.sender.addRow(this.formGroup);
  }

  public editHandler(args: EditEvent): void {
    // define all editable fields validators and default values
    const { dataItem } = args;
    this.closeEditor(args.sender);
    this.formGroup = new FormGroup({
      PersonName: new FormControl("", Validators.required),
      PersonGender: new FormControl("", Validators.required),
      PersonAddress: new FormControl("", Validators.required),
      PersonMobileNo: new FormControl("", Validators.required),
      DateOfBirth: new FormControl("", Validators.required),
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
  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    const product: PersonInterface[] = formGroup.value;

    this.editService.save(product, isNew);

    sender.closeRow(rowIndex);
  }
    public removeHandler(args: RemoveEvent): void {
        // remove the current dataItem from the current data source,
        // `editService` in this example
        this.editService.remove(args.dataItem);
    }

  public cancelHandler(args: CancelEvent): void {
        // close the editor for the given row
        this.closeEditor(args.sender, args.rowIndex);
    }

    public onStateChange(state: State): void {
        this.gridState = state;

        this.editService.read();
    }
}
