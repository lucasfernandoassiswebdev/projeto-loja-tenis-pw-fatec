import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FuncionarioService } from '../../../services/funcionario.service';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private funcionarioService: FuncionarioService
  ) { }

  public titulo: String = 'Novo Funcionário';
  public funcionario: any = {};

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => {
        if (params.id) {
          this.funcionarioService.getById(params.id).subscribe(
            obj => {
              this.funcionario = obj;
              this.titulo = 'Editar Funcionario';
            },
            erro => console.error(erro)
          )
        }
      }
    );
  }

}
