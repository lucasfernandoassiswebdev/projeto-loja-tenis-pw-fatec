import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MarcaService } from '../../../services/marca.service';

@Component({
  selector: 'app-marca-form',
  templateUrl: './marca-form.component.html',
  styleUrls: ['./marca-form.component.css']
})
export class MarcaFormComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private marcaService: MarcaService
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
            erro => console.error(erro)
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
        alert('Marca salvo com sucesso');
        this.router.navigate(['marca']);
      },
      erro => {
        alert('Erro ao salvar a marca: ' + erro.message);
        console.error(erro);
      }
    );
  }

  cancelar() {
    window.history.back();
  }
}
