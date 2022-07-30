import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadList } from './store/actions';
import { List } from './store/model';
import {
  selectList,
  selectLoading,
  selectPrev,
  selectNext,
} from './store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly loading$: Observable<boolean> = this.store.select(selectLoading);
  readonly list$: Observable<List[]> = this.store.select(selectList);
  readonly prev$: Observable<number | null> = this.store.select(selectPrev);
  readonly next$: Observable<number | null> = this.store.select(selectNext);
  fname: string = '';
  pr = 0;
  nx = 0;

  constructor(private store: Store) {
    this.store.dispatch(loadList({ select: '', page: 0, total: 20 }));
    this.prev$.subscribe((data: any) => {
      this.pr = data;
    });
    this.next$.subscribe((data: any) => {
      this.nx = data;
    });
  }

  onSubmit(): void {
    this.store.dispatch(loadList({ select: this.fname, page: 0, total: 20 }));
  }

  onPrev() {
    this.store.dispatch(
      loadList({ select: this.fname, page: this.pr, total: 20 })
    );
  }

  onNext() {
    this.store.dispatch(
      loadList({ select: this.fname, page: this.nx, total: 20 })
    );
  }
}
