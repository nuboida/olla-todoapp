import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Todo } from "../models/todo.model";

export interface TodoState extends EntityState<Todo> {
  isLoading: boolean,
  error: string | null,
  message: string | null,
  dark: boolean
};
export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();
