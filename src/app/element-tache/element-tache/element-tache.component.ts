import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tache } from '../../models/tache';

@Component({
  selector: 'app-element-tache',
  templateUrl: './element-tache.component.html',
  styleUrls: ['./element-tache.component.css']
})
export class ElementTacheComponent {
  @Input() tache!: Tache;
  @Input() enEdition = false;
  @Output() modifier = new EventEmitter<Tache>();
  @Output() supprimer = new EventEmitter<string>();
  @Output() basculerTerminee = new EventEmitter<string>();

  get classePriorite(): string {
    return `priorite-${this.tache.priorite}`;
  }

  get estEnRetard(): boolean {
    if (!this.tache.dateEcheance || this.tache.terminee) {
      return false;
    }
    
    const aujourdhui = new Date();
    const dateEcheance = new Date(this.tache.dateEcheance);
    
    aujourdhui.setHours(0, 0, 0, 0);
    dateEcheance.setHours(0, 0, 0, 0);
    
    return dateEcheance < aujourdhui;
  }

  get dateEcheanceFormatee(): string {
    if (!this.tache.dateEcheance) {
      return 'Pas de date';
    }
    
    const dateEcheance = new Date(this.tache.dateEcheance);
    const aujourdhui = new Date();
    
    aujourdhui.setHours(0, 0, 0, 0);
    dateEcheance.setHours(0, 0, 0, 0);
    
    const diffTime = dateEcheance.getTime() - aujourdhui.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Aujourd'hui";
    }
    
    if (diffDays === 1) {
      return 'Demain';
    }
    
    if (diffDays === -1) {
      return 'Hier';
    }
    
    if (diffDays < 0) {
      return `Il y a ${Math.abs(diffDays)} jours`;
    }
    
    if (diffDays <= 7) {
      return `Dans ${diffDays} jours`;
    }
    
    return dateEcheance.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  get iconePriorite(): string {
    switch (this.tache.priorite) {
      case 1: return '🟢';
      case 2: return '🔵';
      case 3: return '🟡';
      case 4: return '🟠';
      case 5: return '🔴';
      default: return '⚪';
    }
  }

  get couleurFondPriorite(): string {
    switch (this.tache.priorite) {
      case 1: return '#e8f5e9'; // Vert très clair
      case 2: return '#e3f2fd'; // Bleu très clair
      case 3: return '#fff8e1'; // Jaune très clair
      case 4: return '#fff3e0'; // Orange très clair
      case 5: return '#ffebee'; // Rouge très clair
      default: return '#f5f5f5'; // Gris
    }
  }

  onModifier(): void {
    this.modifier.emit(this.tache);
  }

  onSupprimer(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      this.supprimer.emit(this.tache.id);
    }
  }

  onBasculerTerminee(): void {
    this.basculerTerminee.emit(this.tache.id);
  }

  obtenirLibellePriorite(priorite: number): string {
    const libelles = ['Très basse', 'Basse', 'Moyenne', 'Haute', 'Très haute'];
    return libelles[priorite - 1] || 'Non définie';
  }
}