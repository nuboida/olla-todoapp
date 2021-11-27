import { Component } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getTodos } from './appstore/app.selectors';
import { Todo } from './appstore/models/todoApp.model';
import { addTodos } from './appstore/todoApp.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todoForm: FormGroup;
  todos$: Observable<Todo[]> = this.store.pipe(select(getTodos));
  listId = 1;
  noOfItems=0;
  constructor(private store: Store, fb: FormBuilder){
    this.todoForm = fb.group({
      'todo':  ['']
    });
  }

  submitTodo(form: any): void {
    const todo: Todo = {
      id: this.listId,
      title: form.value.todo,
      completed: false,
    }
    this.store.dispatch(addTodos({todo}));
    this.todos$.subscribe((todo) => {
      this.noOfItems = todo.length;
      console.log(this.noOfItems);
    })
    this.listId += 1;
    form.reset()
  }
}
