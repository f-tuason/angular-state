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
      mergeMap((action) => {
        return this.listService
          .getList(action.select, action.page, action.total)
          .pipe(
            tap(console.log),
            delay(1000),
            map((result) => {
              const pagination = {
                previous_page_offset: result.meta.previous_page_offset,
                previous_page: result.meta.previous_page,
                next_page_offset: result.meta.next_page_offset,
                next_page: result.meta.next_page,
              };
              return ListActions.loadListSuccess({
                list: result.data,
                pagination,
              });
            })
          );
      }),
      catchError(() => EMPTY)
    )
  );
}
