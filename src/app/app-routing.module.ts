import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion/connexion.component';
import { ListeTachesComponent } from './liste-taches/liste-taches/liste-taches.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/connexion',
    pathMatch: 'full'
  },
  {
    path: 'connexion',
    component: ConnexionComponent,
    title: 'Connexion - Gestionnaire de Tâches'
  },
  {
    path: 'taches',
    component: ListeTachesComponent,
    title: 'Mes Tâches - Gestionnaire de Tâches'
  },
  {
    path: '**',
    redirectTo: '/connexion'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
