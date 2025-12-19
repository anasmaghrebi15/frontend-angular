import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tache, DonneesFormulaireTache } from '../../models/tache';

@Component({
  selector: 'app-formulaire-tache',
  templateUrl: './formulaire-tache.component.html',
  styleUrls: ['./formulaire-tache.component.css']
})
export class FormulaireTacheComponent implements OnInit, OnChanges {
  @Input() tache?: Tache;
  @Input() chargement = false;
  @Output() soumettreFormulaire = new EventEmitter<DonneesFormulaireTache>();
  @Output() annuler = new EventEmitter<void>();

  formulaireTache: FormGroup;
  dateMinimum: string;

  optionsPriorite = [
    { valeur: 1, libelle: 'Très basse' },
    { valeur: 2, libelle: 'Basse' },
    { valeur: 3, libelle: 'Moyenne' },
    { valeur: 4, libelle: 'Haute' },
    { valeur: 5, libelle: 'Très haute' }
  ];

  constructor(private fb: FormBuilder) {
    this.dateMinimum = new Date().toISOString().split('T')[0];
    
    this.formulaireTache = this.fb.group({
      titre: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      priorite: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      dateEcheance: ['']
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.tache) {
      this.formulaireTache.patchValue({
        titre: this.tache.titre,
        description: this.tache.description,
        priorite: this.tache.priorite,
        dateEcheance: this.tache.dateEcheance 
          ? new Date(this.tache.dateEcheance).toISOString().split('T')[0]
          : ''
      });
    } else {
      this.formulaireTache.reset({
        titre: '',
        description: '',
        priorite: 3,
        dateEcheance: ''
      });
    }
  }

  soumettre(): void {
    if (this.formulaireTache.valid) {
      const formValue = this.formulaireTache.value;
      
      const donneesTache: DonneesFormulaireTache = {
        titre: formValue.titre,
        description: formValue.description,
        priorite: formValue.priorite,
        dateEcheance: formValue.dateEcheance ? new Date(formValue.dateEcheance) : undefined
      };
      
      this.soumettreFormulaire.emit(donneesTache);
      
      if (!this.tache) {
        this.formulaireTache.reset({
          titre: '',
          description: '',
          priorite: 3,
          dateEcheance: ''
        });
      }
    } else {
      this.formulaireTache.markAllAsTouched();
    }
  }

  onAnnuler(): void {
    this.annuler.emit();
  }

  get titre() {
    return this.formulaireTache.get('titre');
  }

  get description() {
    return this.formulaireTache.get('description');
  }

  get priorite() {
    return this.formulaireTache.get('priorite');
  }

  get dateEcheance() {
    return this.formulaireTache.get('dateEcheance');
  }

  obtenirErreur(controlName: string): string {
    const control = this.formulaireTache.get(controlName);
    
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return 'Ce champ est requis';
    }

    if (control.errors['maxlength']) {
      return `Maximum ${control.errors['maxlength'].requiredLength} caractères`;
    }

    if (control.errors['min']) {
      return `La priorité minimale est 1`;
    }

    if (control.errors['max']) {
      return `La priorité maximale est 5`;
    }

    return 'Valeur invalide';
  }
}