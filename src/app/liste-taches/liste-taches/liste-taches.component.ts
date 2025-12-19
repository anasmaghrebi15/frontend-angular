import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Tache } from '../../../../src/app/models/tache';
import * as TacheActions from '../../tache/store/tache.actions';
import * as TacheSelectors from '../../tache/store/tache.selectors';
import * as AuthSelectors from '../../auth/store/auth.selectors';
import * as AuthActions from '../../auth/store/auth.actions';


@Component({
  selector: 'app-liste-taches',
  templateUrl: './liste-taches.component.html',
  styleUrls: ['./liste-taches.component.css']
})
export class ListeTachesComponent implements OnInit, OnDestroy {
  taches$: Observable<Tache[]>;
  incompleteTaches$: Observable<Tache[]>;
  completedTaches$: Observable<Tache[]>;
  loading$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;
  
  showCompleted = false;
  isAddingTache = false;
  editingTache: Tache | null = null;
  
  private destroy$ = new Subject<void>();

  constructor(private store: Store) {
    this.taches$ = this.store.select(TacheSelectors.selectTachesUtilisateur);
    this.incompleteTaches$ = this.store.select(TacheSelectors.selectTachesIncompletes);
    this.completedTaches$ = this.store.select(TacheSelectors.selectTachesCompletees);
    this.loading$ = this.store.select(TacheSelectors.selectChargementTaches);
    this.isLoggedIn$ = this.store.select(AuthSelectors.selectIsLoggedIn);
  }

  ngOnInit(): void {
    this.store.select(AuthSelectors.selectIsLoggedIn)
      .pipe(takeUntil(this.destroy$))
      .subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.store.dispatch(TacheActions.chargerTaches());
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAddTache(tacheData: any): void {
    this.store.dispatch(TacheActions.ajouterTache({ donneesTache: tacheData }));
    this.isAddingTache = false;
  }

  onEditTache(tacheData: any): void {
    if (this.editingTache) {
      this.store.dispatch(TacheActions.modifierTache({
        idTache: this.editingTache.id,
        donneesTache: tacheData
      }));
      this.editingTache = null;
    }
  }

  onDeleteTache(idTache: string): void {
    this.store.dispatch(TacheActions.supprimerTache({ idTache }));
  }

  onToggleTacheCompletion(idTache: string): void {
    this.store.dispatch(TacheActions.basculerTerminaisonTache({ idTache }));
  }

  startAddTache(): void {
    this.isAddingTache = true;
    this.editingTache = null;
  }

  startEditTache(tache: Tache): void {
    this.editingTache = tache;
    this.isAddingTache = false;
  }

  cancelForm(): void {
    this.isAddingTache = false;
    this.editingTache = null;
  }

  onLogout(): void {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      this.store.dispatch(AuthActions.logout());
    }
  }
}