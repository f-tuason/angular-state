import { createAction, props } from '@ngrx/store';
import { List } from './model';

export const loadList = createAction(
  '[List] Load List',
  props<{ select: string; page: number; total: number }>()
);

export const loadListSuccess = createAction(
  '[List] Load List Success',
  props<{ list: List[] }>()
);

export const addList = createAction('[List] Add List');

export const addListSuccess = createAction(
  '[List] Add List Success',
  props<{ list: List }>()
);
