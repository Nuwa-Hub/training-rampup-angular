import { createAction, props } from "@ngrx/store";
import { PersonInterface } from "src/app/models/person-interface";

export const getPersonstart = createAction("[Post] Get PersonData start");
export const getPersonSuccess = createAction(
  "[Post] Get PersonData success",
  props<{ personData: PersonInterface[] }>()
);
export const getPersonFailure = createAction(
  "[Post] Get PersonData failure",
  props<{ error: string }>()
);
export const addPersonstart = createAction(
  "[Post] Add PersonData start",
  props<{ personData: PersonInterface }>()
);
export const addPersonSuccess = createAction( 
  "[Post] Add PersonData success",
);
export const addPersonFailure = createAction(
  "[Post] Add PersonData failure",
  props<{ error: string }>()
);  
export const deletePersonstart = createAction(
  "[Post] Delete PersonData start",
  props<{ PersonID: number }>()
);
export const deletePersonSuccess = createAction(
  "[Post] Delete PersonData success",
);
export const deletePersonFailure = createAction(
  "[Post] Delete PersonData failure",
  props<{ error: string }>()
);
export const updatePersonstart = createAction(
  "[Post] Update PersonData start",
  props<{ personData: PersonInterface }>()
);
export const updatePersonSuccess = createAction(  
  "[Post] Update PersonData success",
);
export const updatePersonFailure = createAction(
  "[Post] Update PersonData failure",
  props<{ error: string }>()
);

