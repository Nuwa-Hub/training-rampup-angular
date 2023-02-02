import { StoreModule } from '@ngrx/store';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomePageComponent } from "./containers/home-page/home-page.component";
import { GridModule } from "@progress/kendo-angular-grid";
import { reducers } from "../store/reducers/personReduces";
import { EffectsModule } from '@ngrx/effects';
import { PersonEffects } from '../store/effects/effects';
import { TableService } from './services/table.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    GridModule,
    StoreModule.forFeature("personData", reducers),
    EffectsModule.forFeature([PersonEffects]),
  ],
   providers: [
        {
            deps: [HttpClient],
            provide: TableService,
            useFactory: (jsonp: HttpClient) => () => new TableService(jsonp)
        }
    ],
})
export class TableModule {}
