import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CadarcoService } from '../../../services/cadarco.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cadarco-form',
  templateUrl: './cadarco-form.component.html',
  styleUrls: ['./cadarco-form.component.css']
})
export class CadarcoFormComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cadarcoService: CadarcoService,
    private snackBar: MatSnackBar
  ) { }

  public titulo: String = 'Novo Cadarço';
  public cadarco: any = {};

  public materiais: any[] = [
    { value: 'Algodão' },
    { value: 'Poliester' },
    { value: 'Elástico' },
    { value: 'Outro' }
  ];

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => {
        if (params.id) {
          this.cadarcoService.getById(params.id).subscribe(
            obj => {
              this.cadarco = obj;
              this.titulo = 'Editar Cadarço';
            },
            error =>  this.snackBar.open('Erro ao buscar dados do cadarço ' + error.message, 'OK')
          )
        }
      }
    );
  }

  salvar() {
    let retorno: any;
    if (this.cadarco._id) {
      retorno = this.cadarcoService.put(this.cadarco);
    } else {
      retorno = this.cadarcoService.post(this.cadarco);
    }
    retorno.subscribe(
      () => {
        this.snackBar.open('Cadarço salvo com sucesso', 'OK', { duration: 2000 });
        this.router.navigate(['cadarco']);
      },
      error => {
        this.snackBar.open(error.error.message, 'OK');
      }
    );
  }

  cancelar() {
    if (confirm('Deseja realmente cancelar as alterações?')) {
      this.router.navigate(['cadarco']);
    }
  }
}
