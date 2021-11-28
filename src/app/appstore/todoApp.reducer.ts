import { createReducer, on, Action } from '@ngrx/store';
import { addTodos, loadTodos, toggleAllComplete, toggleComplete } from './todoApp.actions';
import { TodoState, todoAdapter } from './app.state';

export const initialState: TodoState = todoAdapter.getInitialState({
  dark: false
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
  }),
 on(toggleComplete, (state, {id}) => {
   if (state.entities[id]?.completed === false) {
     return todoAdapter.updateOne({
       id: id,
       changes: {
         completed: true
       }
     }, state)
   } else {
     return todoAdapter.updateOne({
      id: id,
      changes: {
        completed: false
      }
    }, state)
   }
 }),
)
