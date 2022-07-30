import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import * as ListActions from './actions';
import { List, Pagination } from './model';

export const listFeatureKey = 'list';

export interface ListState extends EntityState<List> {
  loading: boolean;
  pagination: Pagination;
}

export function sortByName(a: List, b: List): number {
  return a.name.localeCompare(b.name);
}

export const listAdapter: EntityAdapter<List> = createEntityAdapter<List>({
  sortComparer: sortByName,
});

export const initialState: ListState = listAdapter.getInitialState({
  loading: false,
  pagination: {
    previous_page_offset: -1,
    previous_page: null,
    next_page_offset: -1,
    next_page: null,
  },
});

export const listFeature = createFeature({
  name: listFeatureKey,
  reducer: createReducer(
    initialState,
    on(ListActions.loadList, (state) => ({
      ...state,
      loading: true,
    })),
    on(ListActions.loadListSuccess, (state, action) => {
      return listAdapter.setAll(action.list, {
        ...state,
        loading: false,
        pagination: action.pagination,
      });
    })
    // on(ListActions.addListSuccess, (state, action) =>
    //   listAdapter.addOne(action.list, state)
    // )
  ),
});

const { selectAll } = listAdapter.getSelectors();
//, selectEntities, selectIds, selectTotal

export const selectList = selectAll;
// export const selectListEntities = selectEntities;
// export const selectListIds = selectIds;
// export const selectListTotal = selectTotal;

export const { name, reducer, selectListState } = listFeature;
