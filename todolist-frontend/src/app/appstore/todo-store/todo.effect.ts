import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from '../../todo.service';
import { addTodo, addTodoResponse, deleteTodo, deleteTodoResponse, fetchTodosResponse, loadTodos, toggleActive, toggleActiveResponse } from './todo.actions';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from "rxjs/operators";
import { Todo } from '../../models/todo.model';

@Injectable({providedIn: 'root'})
export class TodosEffect {
  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) { }

  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType(loadTodos),
    exhaustMap(() => this.todoService.getTodos().pipe(
      map((todos: Todo[]) => fetchTodosResponse.successful({todos})),
      catchError((err) => of(fetchTodosResponse.failed({errMsg: err.message})))
    ))
  ))

  addTodo$ = createEffect(() => this.actions$.pipe(
    ofType(addTodo),
    mergeMap(action => this.todoService.addTodo(action.title)
    .pipe(
      map(() => addTodoResponse.successful({message: "Added new todo"})),
      catchError((err) => of(addTodoResponse.failed({errMsg: err.error.errors.Title[0]})))
    ))
  ));

  toggleComplete$ = createEffect(() => this.actions$.pipe(
    ofType(toggleActive),
    mergeMap(action => this.todoService.toggleComplete(action.id)
    .pipe(
      map(() => toggleActiveResponse.successful({ message: "toggle complete"})),
      catchError((err) => of(toggleActiveResponse.failed({ errMsg: err })))
    )
    )
  ));

  deleteTodo$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTodo),
    mergeMap(action => this.todoService.deleteTodo(action.id)
      .pipe(
        map(() => deleteTodoResponse.successful({ message: "Deleted a Todo", id: action.id})),
        catchError((err) => of(deleteTodoResponse.failed({ errMsg: err })))
      )
    )
  ))
}
