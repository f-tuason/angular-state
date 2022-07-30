import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromList from './reducer';

export const selectListState = createFeatureSelector<fromList.ListState>(
  fromList.listFeatureKey
);

export const selectList = createSelector(selectListState, fromList.selectList);

export const selectLoading = createSelector(
  selectListState,
  (state) => state.loading
);
