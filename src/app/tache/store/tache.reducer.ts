import { createReducer, on } from '@ngrx/store';
import * as TacheActions from './tache.actions';
import { Tache } from '../../../app/models/tache';

export interface EtatTache {
  taches: Tache[];
  chargement: boolean;
  erreur: string | null;
  idTacheSelectionnee: string | null;
}

export const etatTacheInitial: EtatTache = {
  taches: [],
  chargement: false,
  erreur: null,
  idTacheSelectionnee: null
};

export const tacheReducer = createReducer(
  etatTacheInitial,
  
  on(TacheActions.chargerTaches, (state) => ({
    ...state,
    chargement: true,
    erreur: null
  })),
  
  on(TacheActions.chargerTachesReussi, (state, { taches }) => ({
    ...state,
    taches,
    chargement: false
  })),
  
  on(TacheActions.chargerTachesEchoue, (state, { erreur }) => ({
    ...state,
    chargement: false,
    erreur
  })),
  
  on(TacheActions.ajouterTache, (state) => ({
    ...state,
    chargement: true,
    erreur: null
  })),
  
  on(TacheActions.ajouterTacheReussi, (state, { tache }) => ({
    ...state,
    taches: [...state.taches, tache],
    chargement: false
  })),
  
  on(TacheActions.ajouterTacheEchoue, (state, { erreur }) => ({
    ...state,
    chargement: false,
    erreur
  })),
  
  on(TacheActions.modifierTache, (state) => ({
    ...state,
    chargement: true,
    erreur: null
  })),
  
  on(TacheActions.modifierTacheReussi, (state, { tache }) => ({
    ...state,
    taches: state.taches.map(t => t.id === tache.id ? tache : t),
    chargement: false
  })),
  
  on(TacheActions.modifierTacheEchoue, (state, { erreur }) => ({
    ...state,
    chargement: false,
    erreur
  })),
  
  on(TacheActions.supprimerTache, (state) => ({
    ...state,
    chargement: true,
    erreur: null
  })),
  
  on(TacheActions.supprimerTacheReussi, (state, { idTache }) => ({
    ...state,
    taches: state.taches.filter(tache => tache.id !== idTache),
    chargement: false
  })),
  
  on(TacheActions.supprimerTacheEchoue, (state, { erreur }) => ({
    ...state,
    chargement: false,
    erreur
  })),
  
  on(TacheActions.basculerTerminaisonTache, (state, { idTache }) => ({
    ...state,
    taches: state.taches.map(tache =>
      tache.id === idTache 
        ? { ...tache, terminee: !tache.terminee, dateModification: new Date() }
        : tache
    )
  }))
);