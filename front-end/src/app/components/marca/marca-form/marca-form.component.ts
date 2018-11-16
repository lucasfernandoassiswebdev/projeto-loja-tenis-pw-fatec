import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MarcaService } from '../../../services/marca.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-marca-form',
  templateUrl: './marca-form.component.html',
  styleUrls: ['./marca-form.component.css']
})
export class MarcaFormComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private marcaService: MarcaService,
    private snackBar: MatSnackBar
  ) { }

  public titulo: String = 'Nova Marca';
  public marca: any = {};

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => {
        if (params.id) {
          this.marcaService.getById(params.id).subscribe(
            obj => {
              this.marca = obj;
              this.titulo = 'Editar Marca';
            },
            error => this.snackBar.open('Erro ao buscar dados da marca ' + error.message, 'OK')
          )
        }
      }
    );
  }

  salvar() {
    let retorno: any;
    if (this.marca._id) {
      retorno = this.marcaService.put(this.marca._id, this.marca);
    } else {
      retorno = this.marcaService.post(this.marca);
    }
    retorno.subscribe(
      () => {
        this.snackBar.open('Marca salva com sucesso', 'OK', { duration: 2000 })
        this.router.navigate(['marca']);
      },
      error => this.snackBar.open(error.error.message, 'OK')
    );
  }

  cancelar() {
    if (confirm('Deseja realmente cancelar as alterações?')) {
      this.router.navigate(['marca']);
    }
  }
}
