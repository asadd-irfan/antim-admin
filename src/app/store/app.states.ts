import { createFeatureSelector } from '@ngrx/store';
import * as admin from './reducers/admin.reducers';

export interface AppState {
  adminState: admin.State;
}

export const reducers =  {
  admin: admin.reducer,
};

export const AdminState = createFeatureSelector<AppState>('admin');
