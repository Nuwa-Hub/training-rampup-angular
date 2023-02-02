import { UserStateInterface } from './../state/userState';
import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/userAction';

export const initialState: UserStateInterface = {
  
  isLoading: false,
  user: {username: localStorage.getItem("username") || ""},
  error: null,
};


export const reducers = createReducer(
  initialState,

  on(UserActions.getUserSuccess, (state, action) => ({
    ...state,
    user: action.user,
  }))
);
