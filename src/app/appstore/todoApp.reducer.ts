import { createReducer, on, Action, StateObservable } from '@ngrx/store';
import { addTodos, clearAllCompleted, deleteTodo, loadTodos, toggleAllComplete, toggleComplete, updateAllComplete } from './todoApp.actions';
import { TodoState, todoAdapter } from './app.state';

export const initialState: TodoState = todoAdapter.getInitialState({
  completeAll: false
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
 on (toggleAllComplete, (state) => {
   if (!state.completeAll) {
     return {
       ...state,
       completeAll: true
     }
   } else {
     return {
       ...state,
       completeAll: false
     }
   }
 }),
 on(updateAllComplete, (state) => {
   if (state.completeAll) {
     let updates: Array<any> = [];
     state.ids.forEach((n) => {
       updates.push({id: n, changes: {completed: true}})
     })
     return todoAdapter.updateMany(updates, state);
   } else {
    let updates: Array<any> = [];
    state.ids.forEach((n) => {
      updates.push({id: n, changes: {completed: false}})
    })
     return todoAdapter.updateMany(updates, state);
   }
 }),
 on(deleteTodo, (state, {id}) => {
   return todoAdapter.removeOne(id, state)
 }),
 on(clearAllCompleted, (state) => {
   let ids: any = []
   state.ids.forEach((id) => {
    if (state.entities[id]?.completed === true) {
      ids.push(id);
    }
  })
    return todoAdapter.removeMany(ids, state)
 })
)
