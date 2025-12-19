import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Tache, DonneesFormulaireTache } from '../models/tache';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private taches: Tache[] = [];
  private readonly STORAGE_KEY = 'todo_app_taches';

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.taches = JSON.parse(stored, (key, value) => {
        if (key === 'dateEcheance' || key === 'dateCreation' || key === 'dateModification') {
          return value ? new Date(value) : undefined;
        }
        return value;
      });
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.taches));
  }

  getUserTaches(userId: string): Observable<Tache[]> {
    const userTaches = this.taches.filter(tache => tache.utilisateurId === userId);
    return of(userTaches).pipe(delay(300));
  }

  createTache(tacheData: Omit<Tache, 'id'>): Observable<Tache> {
    const newTache: Tache = {
      id: uuidv4(),
      ...tacheData
    };

    this.taches.push(newTache);
    this.saveToStorage();
    
    return of(newTache).pipe(delay(300));
  }

  updateTache(tacheId: string, tacheData: Partial<DonneesFormulaireTache>): Observable<Tache> {
    const tacheIndex = this.taches.findIndex(t => t.id === tacheId);
    
    if (tacheIndex === -1) {
      return throwError(() => new Error('Tâche non trouvée'));
    }

    this.taches[tacheIndex] = {
      ...this.taches[tacheIndex],
      ...tacheData,
      dateModification: new Date()
    };

    this.saveToStorage();
    
    return of(this.taches[tacheIndex]).pipe(delay(300));
  }

  deleteTache(tacheId: string): Observable<void> {
    const tacheIndex = this.taches.findIndex(t => t.id === tacheId);
    
    if (tacheIndex === -1) {
      return throwError(() => new Error('Tâche non trouvée'));
    }

    this.taches.splice(tacheIndex, 1);
    this.saveToStorage();
    
    return of(void 0).pipe(delay(300));
  }
}