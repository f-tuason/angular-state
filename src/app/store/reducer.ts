import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import * as ListActions from './actions';
import { List } from './model';

export const listFeatureKey = 'list';

export interface ListState extends EntityState<List> {
  loading: boolean;
}

export function sortByName(a: List, b: List): number {
  return a.name.localeCompare(b.name);
}

export const listAdapter: EntityAdapter<List> = createEntityAdapter<List>({
  sortComparer: sortByName,
});

export const initialState: ListState = listAdapter.getInitialState({
  loading: false,
});

export const listFeature = createFeature({
  name: listFeatureKey,
  reducer: createReducer(
    initialState,
    on(ListActions.loadList, (state) => ({
      ...state,
      loading: true,
    })),
    on(ListActions.loadListSuccess, (state, { list }) =>
      listAdapter.setAll(list, { ...state, loading: false })
    ),
    on(ListActions.addListSuccess, (state, { list }) =>
      listAdapter.addOne(list, state)
    )
  ),
});

const { selectAll, selectEntities, selectIds, selectTotal } =
  listAdapter.getSelectors();
export const selectList = selectAll;
export const selectListEntities = selectEntities;
export const selectListIds = selectIds;
export const selectListTotal = selectTotal;

export const { name, reducer, selectListState } = listFeature;
