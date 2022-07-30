import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from './model';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient) {}

  getList(title: string, page: number, total: number): Observable<List[]> {
    return this.http.get<List[]>(
      'https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=' +
        title +
        '&num=' +
        total.toString() +
        '&offset=' +
        page.toString()
    );
  }
}
