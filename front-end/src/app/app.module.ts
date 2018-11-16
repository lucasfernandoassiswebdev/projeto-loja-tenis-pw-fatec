import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadarcoListComponent } from './components/cadarco/cadarco-list/cadarco-list.component';
import { CadarcoFormComponent } from './components/cadarco/cadarco-form/cadarco-form.component';
import { CargoListComponent } from './components/cargo/cargo-list/cargo-list.component';
import { CargoFormComponent } from './components/cargo/cargo-form/cargo-form.component';
import { MarcaListComponent } from './components/marca/marca-list/marca-list.component';
import { MarcaFormComponent } from './components/marca/marca-form/marca-form.component';
import { SolaListComponent } from './components/sola/sola-list/sola-list.component';
import { SolaFormComponent } from './components/sola/sola-form/sola-form.component';
import { FuncionarioListComponent } from './components/funcionario/funcionario-list/funcionario-list.component';
import { FuncionarioFormComponent } from './components/funcionario/funcionario-form/funcionario-form.component';
import { VendaListComponent } from './components/venda/venda-list/venda-list.component';
import { VendaFormComponent } from './components/venda/venda-form/venda-form.component';
import { TenisListComponent } from './components/tenis/tenis-list/tenis-list.component';
import { TenisFormComponent } from './components/tenis/tenis-form/tenis-form.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    CadarcoListComponent,
    CadarcoFormComponent,
    CargoListComponent,
    CargoFormComponent,
    MarcaListComponent,
    MarcaFormComponent,
    SolaListComponent,
    SolaFormComponent,
    FuncionarioListComponent,
    FuncionarioFormComponent,
    VendaListComponent,
    VendaFormComponent,
    TenisListComponent,
    TenisFormComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMomentDateModule,
    MatSnackBarModule,
    MatMenuModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
