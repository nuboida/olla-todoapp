import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAllCompleted, getTodos } from './appstore/app.selectors';
import { Todo } from './appstore/models/todoApp.model';
import { addTodos, toggleComplete, toggleAllComplete, updateAllComplete, deleteTodo, clearAllCompleted } from './appstore/todoApp.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  darkMode: any;
  todoForm: FormGroup;
  checkField: FormControl;
  todos$: Observable<Todo[]> = this.store.pipe(select(getTodos));
  todos: any;
  displayTodos: any;
  listId = 1;
  noOfItems=0;
  completedAll$: Observable<boolean> = this.store.pipe(select(getAllCompleted));
  completedAll = false;
  AllTodos = true;
  ActiveTodos = false;
  CompletedTodos = false;

  constructor(private store: Store, fb: FormBuilder){
    this.todoForm = fb.group({
      'todo':  ['']
    });

    this.checkField = new FormControl(false);
    this.todos$.subscribe((todo) => {
      this.todos = todo;
      this.displayTodos = this.todos;
    });
    this.completedAll$.subscribe((complete) => {
      this.completedAll = complete
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
    this.noOfItems = this.displayTodos.length;
    this.listId += 1;
    form.reset()
  }

  toggledarkMode() {
    if (this.darkMode === false) {
      this.darkMode = true;
    } else {
      this.darkMode = false;
    }
  };

  toggleAllComplete() {
    this.store.dispatch(toggleAllComplete());
    this.store.dispatch(updateAllComplete());
    console.log(this.completedAll);
  }

  showAll() {
    this.AllTodos = true;
    this.CompletedTodos = false;
    this.ActiveTodos = false;
    this.displayTodos = this.todos
  }
  showActive() {
    this.ActiveTodos = true;
    this.CompletedTodos = false;
    this.AllTodos = false;
    this.displayTodos = this.todos.filter((items: any) => {
      return items.completed === false;
    })
  }
  showCompleted() {
    this.CompletedTodos = true;
    this.ActiveTodos = false;
    this.AllTodos = false;
    this.displayTodos = this.todos.filter((items: any) => {
      return items.completed === true
    })
  }
  deleteTodo(id: number) {
    this.store.dispatch(deleteTodo({id}))
    console.log(this.displayTodos);
    console.log(this.todos);
    this.noOfItems = this.displayTodos.length;
  }
  deleteAllComplete() {
    this.store.dispatch(clearAllCompleted());
    this.noOfItems = this.displayTodos.length;
  }
}
