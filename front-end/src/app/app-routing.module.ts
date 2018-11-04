import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadarcoListComponent } from './components/cadarco/cadarco-list/cadarco-list.component';
import { CadarcoFormComponent } from './components/cadarco/cadarco-form/cadarco-form.component';

const routes: Routes = [
  { path: 'cadarco', component: CadarcoListComponent },
  { path: 'cadarco/new', component: CadarcoFormComponent },
  { path: 'cadarco/:id', component: CadarcoFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
