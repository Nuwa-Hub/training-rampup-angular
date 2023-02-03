import { createReducer, on } from "@ngrx/store";
import * as PersonActions from "../actions/personAction";
import { PersonStateInterface } from "../state/personState";

export const initialState: PersonStateInterface = {
  isLoading: false,
  personData: [],
  error: null,
};

export const reducers = createReducer(
  initialState,
  on(PersonActions.getPersonstart, (state) => ({ ...state, isLoading: true })),
  on(PersonActions.getPersonSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    personData: action.personData,
  })),
  on(PersonActions.getPersonFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(PersonActions.addPersonstart, (state) => ({ ...state, isLoading: true })),
  on(PersonActions.addPersonSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(PersonActions.addPersonFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(PersonActions.deletePersonstart, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PersonActions.deletePersonSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(PersonActions.deletePersonFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(PersonActions.updatePersonstart, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PersonActions.updatePersonSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(PersonActions.updatePersonFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
