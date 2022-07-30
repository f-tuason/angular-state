import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromList from './reducer';

export const selectListState = createFeatureSelector<fromList.ListState>(
  fromList.listFeatureKey
);

export const selectList = createSelector(selectListState, fromList.selectList);

export const selectPrev = createSelector(
  selectListState,
  (state) => state.pagination.previous_page_offset
);

export const selectNext = createSelector(
  selectListState,
  (state) => state.pagination.next_page_offset
);

export const selectLoading = createSelector(
  selectListState,
  (state) => state.loading
);
