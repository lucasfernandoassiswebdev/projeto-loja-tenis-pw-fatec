import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../../services/funcionario.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.css']
})
export class FuncionarioListComponent implements OnInit {
  public funcionarios: any;

  public visibleColumns: string[] = [
    'nome',
    'cpf',
    'cargo',
    'buttons'
  ];

  constructor(private funcionarioService: FuncionarioService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.funcionarioService.get().subscribe(
      data => this.funcionarios = data,
      error => this.snackBar.open('Erro ao listar funcionários ' + error.message, 'OK')
    );
  }

  excluir(id: String) {
    if (confirm("Deseja realmente excluir o funcionário?")) {
      this.funcionarioService.delete(id).subscribe(
        () => {
          this.snackBar.open('Funcionário excluído com sucesso', 'Ok', { duration: 2000 });
          this.ngOnInit();
        },
        error => this.snackBar.open(error.error.message, 'OK')
      )
    }
  }
}
