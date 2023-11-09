import { createReducer, on } from "@ngrx/store";
import { loadTodos, fetchTodosResponse, addTodoResponse, toggleDarkMode, deleteTodoResponse } from "./todo.actions";
import { TodoState, todoAdapter } from "../app.state";

export const initialState: TodoState = todoAdapter.getInitialState({
  isLoading: false,
  error: '',
  message: '',
  dark: false
});

export const TodoReducer = createReducer(
  initialState,
  on(toggleDarkMode, (state) => {
    if (!state.dark) {
      return {
        ...state,
        dark: true
      }
    } else {
      return {
        ...state,
        dark: false
      }
    }
  }),
  on(loadTodos, (state) => {
    return {
      ...state,
      isLoading: true
    }
  }),
  on(fetchTodosResponse.successful, (state, { todos }) => {
    return todoAdapter.addMany(todos, {...state, isLoading: false, error: '', message: ''})
  }),
  on(fetchTodosResponse.failed, (state, { errMsg }) => {
    return {...state, error: errMsg, isLoading: false}
  }),
  on(addTodoResponse.failed,  (state, {errMsg}) => {
    return {...state, error: errMsg, message: '', isLoading: false}
  }),
  on(addTodoResponse.successful, (state, { message }) => {
    return {...state, error: '', message, isLoading: false}
  }),
  on(deleteTodoResponse.successful, (state, {message, id}) => {
    return todoAdapter.removeOne(id, {...state, message, error: '', isLoading: false})
  })
);
