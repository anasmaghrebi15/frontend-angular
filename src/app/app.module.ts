import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ListeTachesComponent } from './liste-taches/liste-taches/liste-taches.component';
import { ElementTacheComponent } from './element-tache/element-tache/element-tache.component';
import { ConnexionComponent } from './connexion/connexion/connexion.component';
import { FormulaireTacheComponent } from './formulaire-tache/formulaire-tache/formulaire-tache.component';
import { ReactiveFormsModule } from '@angular/forms';
import { reducers } from './store';
import { AuthEffects } from './auth/store/auth.effects';
import { TacheEffects } from './tache/store/tache.effects';

@NgModule({
  declarations: [
    AppComponent,
    ListeTachesComponent,
    ElementTacheComponent,
    ConnexionComponent,
    FormulaireTacheComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, TacheEffects]),
    /*StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode()
    })*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
