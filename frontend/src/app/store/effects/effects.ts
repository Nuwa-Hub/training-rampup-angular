import { ApiService } from "src/app/services/api.service";
import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { map, mergeMap, catchError, of, switchMap } from "rxjs";
import * as PersonActions from "../actions/personAction";

@Injectable()
export class PersonEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  getPersonData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonActions.getPersonstart),
      switchMap(() => {
        return this.apiService.fetchPersondata().pipe(
          map((personData) => PersonActions.getPersonSuccess({ personData })),
          catchError((error) =>
            of(PersonActions.getPersonFailure({ error: error.message }))
          )
        );
      })
    )
  );
  addPersonData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonActions.addPersonstart),
      switchMap((personData) => {
        return this.apiService.addPersondata(personData.personData).pipe(
          switchMap(() => {
            return this.apiService.fetchPersondata().pipe(
              map((personData) =>
                PersonActions.getPersonSuccess({ personData })
              ),
              catchError((error) =>
                of(PersonActions.getPersonFailure({ error: error.message }))
              )
            );
          }),
          catchError((error) =>
            of(PersonActions.addPersonFailure({ error: error.message }))
          )
        );
      })
    )
  );
deletePersonData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonActions.deletePersonstart),
      switchMap(({PersonID}) => {
        return this.apiService.removePersondata(PersonID).pipe(
          switchMap(() => {
            return this.apiService.fetchPersondata().pipe(
              map((personData) =>
                PersonActions.getPersonSuccess({ personData })
              ),
              catchError((error) =>
                of(PersonActions.getPersonFailure({ error: error.message }))
              )
            );
          }),
          catchError((error) =>
            of(PersonActions.addPersonFailure({ error: error.message }))
          )
        );
      })
    )
  );


 updatePersonData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonActions.updatePersonstart),
      switchMap((personData) => {
        return this.apiService.updatePersondata(personData.personData).pipe(
          switchMap(() => {
            return this.apiService.fetchPersondata().pipe(
              map((personData) =>
                PersonActions.getPersonSuccess({ personData })
              ),
              catchError((error) =>
                of(PersonActions.getPersonFailure({ error: error.message }))
              )
            );
          }),
          catchError((error) =>
            of(PersonActions.addPersonFailure({ error: error.message }))
          )
        );
      })
    )
  );
}
