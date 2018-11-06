import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadarcoListComponent } from './components/cadarco/cadarco-list/cadarco-list.component';
import { CadarcoFormComponent } from './components/cadarco/cadarco-form/cadarco-form.component';
import { CargoListComponent } from './components/cargo/cargo-list/cargo-list.component';
import { CargoFormComponent } from './components/cargo/cargo-form/cargo-form.component';
import { MarcaListComponent } from './components/marca/marca-list/marca-list.component';
import { MarcaFormComponent } from './components/marca/marca-form/marca-form.component';
import { SolaListComponent } from './components/sola/sola-list/sola-list.component';
import { SolaFormComponent } from './components/sola/sola-form/sola-form.component';

const routes: Routes = [
  { path: 'cadarco', component: CadarcoListComponent },
  { path: 'cadarco/new', component: CadarcoFormComponent },
  { path: 'cadarco/:id', component: CadarcoFormComponent },
  { path: 'cargo', component: CargoListComponent },
  { path: 'cargo/new', component: CargoFormComponent },
  { path: 'cargo/:id', component: CargoFormComponent },
  { path: 'marca', component: MarcaListComponent },
  { path: 'marca/new', component: MarcaFormComponent },
  { path: 'marca/:id', component: MarcaFormComponent },
  { path: 'sola', component: SolaListComponent },
  { path: 'sola/new', component: SolaFormComponent },
  { path: 'sola/:id', component: SolaFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
