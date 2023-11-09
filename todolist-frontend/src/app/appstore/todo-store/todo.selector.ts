import { createSelector } from "@ngrx/store";
import { Todo } from "../../models/todo.model";

const AppCore = (state: any) => state.todos;

export const getAllTodos = createSelector(
  AppCore,
  (state) => {
    return state;
  }
);

export const getErrorMessage = createSelector(
  AppCore,
  (state) => {
    if (state.error)
      return state.error;
  }
);

export const getSuccessMessage = createSelector(
  AppCore,
  (state) => {
    if (state.message) {
      return state.message;
    }
  }
);

export const getDarkMode = createSelector(
  AppCore,
  (state) => state.dark
);

export const getEntities = createSelector(
  AppCore,
  (state) => state.entities
);

export const getTodos = createSelector(
  getEntities,
  (entities) => Object.values(entities) as Todo[]
);
