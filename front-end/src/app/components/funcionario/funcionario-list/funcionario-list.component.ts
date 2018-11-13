import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../../services/funcionario.service';

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

  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit() {
    this.funcionarioService.get().subscribe(
      data => this.funcionarios = data,
      error => console.error(error.message)
    );
  }
}
