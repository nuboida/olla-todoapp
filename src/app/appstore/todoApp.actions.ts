import { createAction, props} from '@ngrx/store';
import {Todo} from "./models/todoApp.model";

export const loadTodos = createAction(
  '[App Component] Fetch Todos'
)

export const addTodos = createAction(
  '[App Component] add a todo',
  props<{todo: Todo}>()
)

export const toggleComplete = createAction(
  '[App Component] Toggle Completed',
  props<{id: number}>()
)

export const toggleAllComplete = createAction(
  '[App Component] Toggle All Completed'
)

export const updateAllComplete = createAction(
  '[App Component] Update all complete',
)

export const deleteTodo = createAction(
  '[App Component] Delete selected Todo',
  props<{id: number}>()
)

export const clearAllCompleted = createAction(
  '[App Component] Remove All Completed Todos',
)
