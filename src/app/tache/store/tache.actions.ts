import { createAction, props } from '@ngrx/store';
import { Tache, DonneesFormulaireTache } from '../../../app/models/tache';

export const chargerTaches = createAction('[Taches] Charger Tâches');

export const chargerTachesReussi = createAction(
  '[Taches] Charger Tâches Réussi',
  props<{ taches: Tache[] }>()
);

export const chargerTachesEchoue = createAction(
  '[Taches] Charger Tâches Échoué',
  props<{ erreur: string }>()
);

export const ajouterTache = createAction(
  '[Taches] Ajouter Tâche',
  props<{ donneesTache: DonneesFormulaireTache }>()
);

export const ajouterTacheReussi = createAction(
  '[Taches] Ajouter Tâche Réussi',
  props<{ tache: Tache }>()
);

export const ajouterTacheEchoue = createAction(
  '[Taches] Ajouter Tâche Échoué',
  props<{ erreur: string }>()
);

export const modifierTache = createAction(
  '[Taches] Modifier Tâche',
  props<{ idTache: string; donneesTache: Partial<DonneesFormulaireTache> }>()
);

export const modifierTacheReussi = createAction(
  '[Taches] Modifier Tâche Réussi',
  props<{ tache: Tache }>()
);

export const modifierTacheEchoue = createAction(
  '[Taches] Modifier Tâche Échoué',
  props<{ erreur: string }>()
);

export const supprimerTache = createAction(
  '[Taches] Supprimer Tâche',
  props<{ idTache: string }>()
);

export const supprimerTacheReussi = createAction(
  '[Taches] Supprimer Tâche Réussi',
  props<{ idTache: string }>()
);

export const supprimerTacheEchoue = createAction(
  '[Taches] Supprimer Tâche Échoué',
  props<{ erreur: string }>()
);

export const basculerTerminaisonTache = createAction(
  '[Taches] Basculer Terminaison Tâche',
  props<{ idTache: string }>()
);