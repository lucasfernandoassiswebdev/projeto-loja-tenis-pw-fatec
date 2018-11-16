import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SolaService } from '../../../services/sola.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sola-form',
  templateUrl: './sola-form.component.html',
  styleUrls: ['./sola-form.component.css']
})
export class SolaFormComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private solaService: SolaService,
    private snackBar: MatSnackBar
  ) { }

  public titulo: String = 'Nova Sola';
  public sola: any = {};

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => {
        if (params.id) {
          this.solaService.getById(params.id).subscribe(
            obj => {
              this.sola = obj;
              this.titulo = 'Editar Sola';
            },
            error => this.snackBar.open('Erro ao buscar dados da sola ' + error.message, 'OK')
          )
        }
      }
    );
  }

  salvar() {
    let retorno: any;
    if (this.sola._id) {
      retorno = this.solaService.put(this.sola._id, this.sola);
    } else {
      retorno = this.solaService.post(this.sola);
    }
    retorno.subscribe(
      () => {
        this.snackBar.open('Sola salva com sucesso', 'OK', { duration: 2000 });
        this.router.navigate(['sola']);
      },
      error => {
        this.snackBar.open(error.error.message, 'OK');
      }
    );
  }

  cancelar() {
    if (confirm('Deseja realmente cancelar as alterações?')) {
      this.router.navigate(['sola']);
    }
  }
}
