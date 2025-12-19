import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import * as TacheActions from './tache.actions';
import { TacheService } from '../../services/tache.service';
import { selectCurrentUser } from '../../auth/store/auth.selectors';

@Injectable()
export class TacheEffects {
  chargerTaches$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TacheActions.chargerTaches),
      withLatestFrom(this.store.select(selectCurrentUser)),
      switchMap(([, utilisateur]) =>
        this.tacheService.getUserTaches(utilisateur!.id).pipe(
          map(taches => TacheActions.chargerTachesReussi({ taches })),
          catchError(erreur => of(TacheActions.chargerTachesEchoue({ erreur: erreur.message })))
        )
      )
    )
  );

  ajouterTache$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TacheActions.ajouterTache),
      withLatestFrom(this.store.select(selectCurrentUser)),
      switchMap(([{ donneesTache }, utilisateur]) =>
        this.tacheService.createTache({
          ...donneesTache,
          utilisateurId: utilisateur!.id,
          terminee: false,
          dateCreation: new Date(),
          dateModification: new Date()
        }).pipe(
          map(tache => TacheActions.ajouterTacheReussi({ tache })),
          catchError(erreur => of(TacheActions.ajouterTacheEchoue({ erreur: erreur.message })))
        )
      )
    )
  );

  modifierTache$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TacheActions.modifierTache),
      switchMap(({ idTache, donneesTache }) =>
        this.tacheService.updateTache(idTache, donneesTache).pipe(
          map(tache => TacheActions.modifierTacheReussi({ tache })),
          catchError(erreur => of(TacheActions.modifierTacheEchoue({ erreur: erreur.message })))
        )
      )
    )
  );

  supprimerTache$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TacheActions.supprimerTache),
      switchMap(({ idTache }) =>
        this.tacheService.deleteTache(idTache).pipe(
          map(() => TacheActions.supprimerTacheReussi({ idTache })),
          catchError(erreur => of(TacheActions.supprimerTacheEchoue({ erreur: erreur.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private tacheService: TacheService
  ) {}
}