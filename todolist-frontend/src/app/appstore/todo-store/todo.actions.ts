import { createActionGroup, props, createAction } from '@ngrx/store';
import { Todo } from "../../models/todo.model";

// Fetch All Todo
export const loadTodos = createAction(
  "[Todo API] Fetch Todos"
);
export const fetchTodosResponse = createActionGroup({
  source: "Todo API",
  events: {
    'Successful': props<{todos:Todo[]}>(),
    'Failed': props<{errMsg: string}>()
  }
});

// Add New Todo
export const addTodo = createAction(
  "[Add Todo] Add New Todo",
  props<{ title: string }>()
)
export const addTodoResponse = createActionGroup({
  source: "Add Todo",
  events: {
    "successful": props<{ message: string }>(),
    "failed": props<{ errMsg: string }>()
  }
});

// Toggle Dark Mode
export const toggleDarkMode = createAction(
  '[App Component] Toggle Dark Mode'
);

// Toggle Complete
export const toggleActive = createAction(
  '[Active] Toggle Complete',
  props<{ id: string } >()
);
export const toggleActiveResponse = createActionGroup({
  source: "Toggle Complete",
  events: {
    "successful": props<{ message: string }>(),
    "failed": props<{ errMsg: string }>()
  }
});

// Delete Todo
export const deleteTodo = createAction(
  "[Delete Todo] Delete Todo",
  props<{ id: string }>()
);
export const deleteTodoResponse = createActionGroup({
  source: "Delete Todo",
  events: {
    "successful": props<{ message: string, id: string }>(),
    "failed": props<{ errMsg: string }>()
  }
});
