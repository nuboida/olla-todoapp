import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getDarkMode, getTodos } from './appstore/app.selectors';
import { Todo } from './appstore/models/todoApp.model';
import { addTodos, toggleComplete, toggleDarkMode } from './appstore/todoApp.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  darkmode$: Observable<boolean> = this.store.pipe(select(getDarkMode));
  darkMode: any;
  todoForm: FormGroup;
  checkField: FormControl;
  todos$: Observable<Todo[]> = this.store.pipe(select(getTodos));
  todos: any;
  listId = 1;
  noOfItems=0;

  constructor(private store: Store, fb: FormBuilder){
    this.todoForm = fb.group({
      'todo':  ['']
    });

    this.checkField = new FormControl(false);
    this.todos$.subscribe((todo) => {
      this.todos = todo;
    });
    this.darkmode$.subscribe((dark) => {
      this.darkMode = dark
    })
  }

  toggleCompletion(id: number) {
    this.store.dispatch(toggleComplete({id}))
  }

  submitTodo(form: any): void {
    const todo: Todo = {
      id: this.listId,
      title: form.value.todo,
      completed: false,
    }
    this.store.dispatch(addTodos({todo}));
    this.noOfItems = this.todos.length;
    this.listId += 1;
    form.reset()
  }

  toggledarkMode() {
    if (this.darkMode === false) {
      this.darkMode = true;
      this.store.dispatch(toggleDarkMode(this.darkMode))
      console.log(this.darkMode);
    } else {
      this.darkMode = false;
      this.store.dispatch(toggleDarkMode(this.darkMode));
      console.log(this.darkMode);
    }
  }
}
