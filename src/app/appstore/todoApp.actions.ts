import { createAction, props} from '@ngrx/store';
import {Todo} from "./models/todoApp.model";

export const loadTodos = createAction(
  '[App Component] Fetch Todos'
)

export const addTodos = createAction(
  '[App Component] add a todo',
  props<{todo: Todo}>()
)
