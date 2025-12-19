import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EtatTache } from './tache.reducer';
import { selectCurrentUser } from '../../auth/store/auth.selectors';

export const selectEtatTache = createFeatureSelector<EtatTache>('taches');

export const selectToutesTaches = createSelector(
  selectEtatTache,
  (state) => state.taches
);

export const selectTachesUtilisateur = createSelector(
  selectToutesTaches,
  selectCurrentUser,
  (taches, utilisateur) => taches.filter(tache => tache.utilisateurId === utilisateur?.id)
);

export const selectTachesIncompletes = createSelector(
  selectTachesUtilisateur,
  (taches) => taches.filter(tache => !tache.terminee)
);

export const selectTachesCompletees = createSelector(
  selectTachesUtilisateur,
  (taches) => taches.filter(tache => tache.terminee)
);

export const selectTachesHautePriorite = createSelector(
  selectTachesUtilisateur,
  (taches) => taches.filter(tache => tache.priorite >= 4)
);

export const selectChargementTaches = createSelector(
  selectEtatTache,
  (state) => state.chargement
);

export const selectErreurTaches = createSelector(
  selectEtatTache,
  (state) => state.erreur
);

export const selectTacheParId = (idTache: string) => createSelector(
  selectToutesTaches,
  (taches) => taches.find(tache => tache.id === idTache)
);