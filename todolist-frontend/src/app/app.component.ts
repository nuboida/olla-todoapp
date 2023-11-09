import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Todo } from './models/todo.model';
import { Store, select } from '@ngrx/store';
import { getDarkMode, getTodos } from './appstore/todo-store/todo.selector';
import { addTodo, addTodoResponse, deleteTodo, deleteTodoResponse, fetchTodosResponse, loadTodos, toggleActive, toggleActiveResponse, toggleDarkMode } from './appstore/todo-store/todo.actions';
import { HotToastService } from "@ngneat/hot-toast";
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {
  todoForm!: FormGroup;
  activeForm!: FormGroup;
  darkMode$: Observable<boolean> = this.store.pipe(select(getDarkMode));
  todos$!: Observable<Todo[]>;
  listId = 1;
  noOfItems = 0;

get activectl() {
  return this.activeForm.get('actives') as FormArray;
}
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private toast: HotToastService,
    private updates$: Actions
  ){
    this.todos$ = this.store.pipe(select(getTodos));
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("change detected");
  }
  ngOnInit(): void {
    this.todoForm = this.fb.group({
      'title': ['']
    });

    this.activeForm = this.fb.group({
      actives: this.fb.array([])
    });

    this.store.dispatch(loadTodos());

    this.updates$.pipe(
      ofType(addTodoResponse.failed)
    ).subscribe((err) => {
      this.toast.error(err.errMsg);
      return;
    });

    this.updates$.pipe(
      ofType(addTodoResponse.successful)
    ).subscribe((r) => {
      this.toast.success(r.message);
      this.store.dispatch(loadTodos());
    });

    this.updates$.pipe(
      ofType(deleteTodoResponse.successful)
    ).subscribe((r) => {
      this.toast.info(r.message);
      this.store.dispatch(loadTodos());
    })

    this.todos$.subscribe((todos) => {
      this.noOfItems = todos.length;
      todos.forEach((todo) => {
        this.activectl.push(this.fb.group({
          complete: [todo.complete]
        }))
      })
    });
  }

  submitTodo(form: FormGroup): void {
    this.store.dispatch(addTodo(form.value));
    form.reset();
  }

  toggleActive(event: Event): void {
    const element = event.target as HTMLInputElement;
    const elementId = element.id;
    this.store.dispatch(toggleActive({id: elementId}))
  }

  toggleDarkMode() {
    this.store.dispatch(toggleDarkMode());
  }

  deleteTodo(id: string): void {
    this.store.dispatch(deleteTodo({id}))
  }
}
