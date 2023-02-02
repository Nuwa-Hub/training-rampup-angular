import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/types/appState.interface";

export const selectFeaturePersondata = (state: AppStateInterface) =>
  state.personData;

export const isLoadingSelector = createSelector(
  selectFeaturePersondata,
  (persondataState) => persondataState.isLoading
);
export const personDataSelector = createSelector(
  selectFeaturePersondata,
  (persondataState) => persondataState.personData
);
export const errSelector = createSelector(
  selectFeaturePersondata,
  (persondataState) => persondataState.error
);

