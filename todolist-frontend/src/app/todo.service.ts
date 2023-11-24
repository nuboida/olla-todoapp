import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, catchError } from 'rxjs';
import { Todo } from './models/todo.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

constructor(
  private http: HttpClient
) { }

getTodos(): Observable<Todo[]> {
  return this.http.get('/api/todos').pipe(
    map((data: any) => data || [])
  )
}
addTodo<T>(title: string): Observable<T> {
  return this.http.post<T>('/api/todos', {title})
  }

toggleComplete<T>(id: string): Observable<T> {
  return this.http.post<T>(`/api/todos/${id}/active`, {});
}

deleteTodo<T>(id: string): Observable<T> {
  return this.http.delete<T>(`/api/todos/${id}`);
}
}
