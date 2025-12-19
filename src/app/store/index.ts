import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from '../auth/store/auth.reducer';
import { EtatTache, tacheReducer } from '../tache/store/tache.reducer';

export interface AppState {
  auth: AuthState;
  taches: EtatTache;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  taches: tacheReducer
};