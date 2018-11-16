import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CargoService } from '../../../services/cargo.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cargo-form',
  templateUrl: './cargo-form.component.html',
  styleUrls: ['./cargo-form.component.css']
})
export class CargoFormComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cargoService: CargoService,
    private snackBar: MatSnackBar
  ) { }

  public titulo: String = 'Novo Cargo';
  public cargo: any = {};

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => {
        if (params.id) {
          this.cargoService.getById(params.id).subscribe(
            obj => {
              this.cargo = obj;
              this.titulo = 'Editar Cargo';
            },
            error => this.snackBar.open('Erro ao buscar dados do cargo ' + error.message, 'OK')
          )
        }
      }
    );
  }

  salvar() {
    let retorno: any;
    if (this.cargo._id) {
      retorno = this.cargoService.put(this.cargo._id, this.cargo);
    } else {
      retorno = this.cargoService.post(this.cargo);
    }
    retorno.subscribe(
      () => {
        this.snackBar.open('Cargo salvo com sucesso', 'OK', { duration: 2000 });
        this.router.navigate(['cargo']);
      },
      error => this.snackBar.open(error.error.message, 'OK')
    );
  }

  cancelar() {
    if (confirm('Deseja realmente cancelar as alterações?')) {
      this.router.navigate(['cargo']);
    }
  }
}
