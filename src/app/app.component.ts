import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addListSuccess, loadList } from './store/actions';
import { List } from './store/model';
import { selectList, selectLoading } from './store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly loading$: Observable<boolean> = this.store.select(selectLoading);
  readonly list$: Observable<List[]> = this.store.select(selectList);
  fname: string = '';

  constructor(private store: Store) {
    this.store.dispatch(loadList({ select: '', page: 0, total: 20 }));
  }

  onSubmit(): void {
    //const user = { id: 2, name: this.newUser };
    console.log(this.fname);
    this.store.dispatch(loadList({ select: this.fname, page: 0, total: 20 }));
    //this.store.dispatch(addUserSuccess({ user }));
  }
}
