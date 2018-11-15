import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CadarcoService } from '../../../services/cadarco.service';

@Component({
  selector: 'app-cadarco-form',
  templateUrl: './cadarco-form.component.html',
  styleUrls: ['./cadarco-form.component.css']
})
export class CadarcoFormComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cadarcoService: CadarcoService
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
            erro => console.error(erro)
          )
        }
      }
    );
  }

  salvar() {
    let retorno: any;
    if (this.cadarco._id) {
      retorno = this.cadarcoService.put(this.cadarco._id, this.cadarco);
    } else {
      retorno = this.cadarcoService.post(this.cadarco);
    }
    retorno.subscribe(
      () => {
        alert('Cadarço salvo com sucesso');
        this.router.navigate(['cadarco']);
      },
      error => {
        alert('Erro ao salvar o cadarço: ' + error.message);
        console.error(error);
      }
    );
  }

  cancelar() {
    if (confirm('Deseja realmente cancelar as alterações?')) {
      this.router.navigate(['cadarco']);
    }
  }
}
