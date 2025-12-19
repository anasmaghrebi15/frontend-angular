import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../../auth/store/auth.actions';
import * as AuthSelectors from '../../auth/store/auth.selectors';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  formulaireConnexion: FormGroup;
  chargement$: Observable<boolean>;
  erreur$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.formulaireConnexion = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    
    this.chargement$ = this.store.select(AuthSelectors.selectAuthLoading);
    this.erreur$ = this.store.select(AuthSelectors.selectAuthError);
  }

  ngOnInit(): void {
  }

  soumettre(): void {
    if (this.formulaireConnexion.valid) {
      const email = this.formulaireConnexion.get('email')?.value;
      this.store.dispatch(AuthActions.login({ email }));
      console.log(this.store)
    }
  }

  obtenirErreurValidation(): string {
    const control = this.formulaireConnexion.get('email');
    
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return 'L\'email est requis';
    }

    if (control.errors['email']) {
      return 'Format d\'email invalide';
    }

    return '';
  }
}