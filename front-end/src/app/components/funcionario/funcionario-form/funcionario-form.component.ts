import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FuncionarioService } from '../../../services/funcionario.service';
import { CargoService } from '../../../services/cargo.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private funcionarioService: FuncionarioService,
    private cargoService: CargoService,
    private snackBar: MatSnackBar
  ) { }

  public titulo: String = 'Novo Funcionário';
  public funcionario: any = {
    cargo: {

    }
  };
  public cargos: any = [];

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => {
        if (params.id) {
          this.funcionarioService.getById(params.id).subscribe(
            obj => {
              this.funcionario = obj;
              this.titulo = 'Editar Funcionário';
            },
            error => this.snackBar.open('Erro ao buscar dados do Funcionário ' + error.message, 'OK')
          )
        }
      }      
    );

    //buscando os cargos para preencher o combo
    this.cargoService.get().subscribe(
      data => this.cargos = data,
      error => this.snackBar.open('Erro ao buscar cargos ' + error.message, 'OK')
    );
  }

  salvar() {
    let retorno: any;
    if (this.funcionario._id) {
      retorno = this.funcionarioService.put(this.funcionario._id, this.funcionario);
    } else {
      retorno = this.funcionarioService.post(this.funcionario);
    }
    retorno.subscribe(
      () => {
        this.snackBar.open('Funcionário salvo com sucesso', 'OK', { duration: 2000 });
        this.router.navigate(['funcionario']);
      },
      error => {
        this.snackBar.open(error.error.message, 'OK');
      }
    );
  }

  cancelar() {
    if (confirm('Deseja realmente cancelar as alterações?')) {
      this.router.navigate(['funcionario']);
    }
  }
}
