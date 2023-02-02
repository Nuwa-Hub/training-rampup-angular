import { Store, StoreModule } from "@ngrx/store";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomePageComponent } from "./containers/home-page/home-page.component";
import { GridModule } from "@progress/kendo-angular-grid";
import { reducers } from "../store/reducers/personReduces";
import { EffectsModule } from "@ngrx/effects";
import { PersonEffects } from "../store/effects/effects";
import { TableService } from "./services/table.service";
import { HttpClient } from "@angular/common/http";
import { AppStateInterface } from "../types/appState.interface";
import { DropDownListModule } from "@progress/kendo-angular-dropdowns";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PopupModule } from "@progress/kendo-angular-popup";
import { PopupAnchorDirective } from "../utils/derectives/popupAnchor.derective/popup-anchor.directive";
import { InputsModule } from "@progress/kendo-angular-inputs";

@NgModule({
  declarations: [HomePageComponent, PopupAnchorDirective],
  imports: [
    CommonModule,
    GridModule,
    StoreModule.forFeature("personData", reducers),
    EffectsModule.forFeature([PersonEffects]),
    DropDownListModule,
    DateInputsModule,
    ReactiveFormsModule,
    FormsModule,
    PopupModule,
    InputsModule,
  ],

  providers: [
    {
      deps: [Store],
      provide: TableService,
      useFactory: (store: Store<AppStateInterface>) => () =>
        new TableService(store),
    },
  ],
})
export class TableModule {}