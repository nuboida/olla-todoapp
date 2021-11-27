import { createReducer, on, Action } from '@ngrx/store';
import { addTodos, loadTodos } from './todoApp.actions';
import { TodoState, todoAdapter } from './app.state';

export const initialState: TodoState = todoAdapter.getInitialState({

});

export const TodoReducer = createReducer(
  initialState,
  on(loadTodos, (state) => {
    return {
      ...state
    }
  }),
  on(addTodos, (state, {todo}) => {
    return todoAdapter.addOne(todo, state)
  })
)
