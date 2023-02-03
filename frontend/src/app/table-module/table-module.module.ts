import {  StoreModule } from "@ngrx/store";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomePageComponent } from "./containers/home-page/home-page.component";
import { GridModule } from "@progress/kendo-angular-grid";
import { reducers } from "../store/reducers/personReduces";
import { EffectsModule } from "@ngrx/effects";
import { PersonEffects } from "../store/effects/effects";
import { DropDownListModule } from "@progress/kendo-angular-dropdowns";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PopupModule } from "@progress/kendo-angular-popup";
import { PopupAnchorDirective } from "../utils/derectives/popupAnchor.derective/popup-anchor.directive";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NotificationModule } from "@progress/kendo-angular-notification";
import { environment } from "src/environments/environment";
const config: SocketIoConfig = { url: `${environment.socketApiUrl}`, options: {} };

@NgModule({
  declarations: [HomePageComponent, PopupAnchorDirective],
  imports: [
    SocketIoModule.forRoot(config),
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
    BrowserAnimationsModule,
    NotificationModule,
  ],

  providers: [
  ],
})
export class TableModule {}
