import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { delay, map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as ListActions from './actions';
import { ListService } from './service';

@Injectable()
export class ListEffects {
  constructor(private actions$: Actions, private listService: ListService) {}

  loadList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListActions.loadList),
      mergeMap((params) => {
        return this.listService
          .getList(params.select, params.page, params.total)
          .pipe(
            tap(console.log),
            //delay(3000),
            map((result) => {
              return ListActions.loadListSuccess({ list: result.data });
            })
          );
      }),
      catchError(() => EMPTY)
    )
  );
}
