import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadarcoListComponent } from './components/cadarco/cadarco-list/cadarco-list.component';
import { CadarcoFormComponent } from './components/cadarco/cadarco-form/cadarco-form.component';
import { CargoListComponent } from './components/cargo/cargo-list/cargo-list.component';
import { CargoFormComponent } from './components/cargo/cargo-form/cargo-form.component';

const routes: Routes = [
  { path: 'cadarco', component: CadarcoListComponent },
  { path: 'cadarco/new', component: CadarcoFormComponent },
  { path: 'cadarco/:id', component: CadarcoFormComponent },
  { path: 'cargo', component: CargoListComponent },
  { path: 'cargo/new', component: CargoFormComponent },
  { path: 'cargo/:id', component: CargoFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
