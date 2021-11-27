import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {Todo} from './models/todoApp.model';

export interface TodoState extends EntityState<Todo> {}

export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();
