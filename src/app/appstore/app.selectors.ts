import { createSelector } from '@ngrx/store';
import { Todo } from './models/todoApp.model';

const AppCore = (state: any) => state.todos;

export const getAllTodos = createSelector(
  AppCore,
  (state) => {
    return state;
  }
)

export const getEntities = createSelector(
  AppCore,
  (state) => state.entities
)

export const getTodos = createSelector(
  getEntities,
  (entities) => Object.values(entities) as Todo[]
)
