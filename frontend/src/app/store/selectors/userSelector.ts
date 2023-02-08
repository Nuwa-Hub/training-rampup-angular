import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

export const selectFeatureUser = (state: AppStateInterface) => state.user;

export const userSelector = createSelector(
  selectFeatureUser,
  (userState) => userState.user?.username
);
