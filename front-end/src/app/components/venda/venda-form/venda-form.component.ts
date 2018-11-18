import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VendaService } from '../../../services/venda.service';
import { TenisService } from '../../../services/tenis.service';
import { FuncionarioService } from '../../../services/funcionario.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-venda-form',
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.css']
})
export class VendaFormComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private vendaService: VendaService,
    private tenisService: TenisService,
    private funcionarioService: FuncionarioService,
    private snackBar: MatSnackBar
  ) { }

  public titulo: String = 'Novo Tênis';
  public venda: any = {
    tenis_atual: [],
    tenis_venda: [],
    quantidade: 0,
    funcionario: {}
  };
  public tenis_disponiveis: any = [];
  public funcionarios: any = [];

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => {
        if (params.id) {
          this.vendaService.getById(params.id).subscribe(
            obj => {
              this.venda = obj;
              this.titulo = 'Editar Venda';
            },
            error => this.snackBar.open('Erro ao buscar dados da venda ' + error.message, 'OK')
          )
        }
      }
    );

    this.tenisService.get().subscribe(
      data => this.tenis_disponiveis = data,
      error => this.snackBar.open('Erro ao buscar tênis disponíveis ' + error.message, 'OK')
    );

    this.funcionarioService.get().subscribe(
      data => this.funcionarios = data,
      error => this.snackBar.open('Erro ao buscar funcionários cadastrados ' + error.message, 'OK')
    );
  }

  salvar() {
    let retorno: any;

    this.venda.funcionario = this.venda.funcionario._id;
    this.venda.tenis_venda.forEach(function (item) {
      if (item.tenis != undefined && item.tenis.id != undefined)
        item.tenis = item.tenis.id
    });

    if (this.venda._id) {
      retorno = this.vendaService.put(this.venda._id, this.venda);
    } else {
      retorno = this.vendaService.post(this.venda);
    }
    retorno.subscribe(
      () => {
        this.snackBar.open('Venda salvo com sucesso', 'OK', { duration: 2000 });
        this.router.navigate(['venda']);
      },
      error => {
        this.snackBar.open(error.error.message, 'OK');
      }
    );
  }

  cancelar() {
    if (confirm('Deseja realmente cancelar as alterações?')) {
      this.router.navigate(['venda']);
    }
  }

  adicionarItem() {
    var nome: string;
    var screen = this.venda;
    var vend = this;
    var add = true;

    this.tenis_disponiveis.forEach(function (item) {
      if (item._id == screen.tenis_atual) {
        nome = item.nome;
      }
    });

    this.venda.tenis_venda.forEach(function (item) {
      if (item.tenis._id == screen.tenis_atual || (item.tenis._id != undefined && item.tenis._id == screen.tenis_atual)) {
        vend.snackBar.open('Este mesmo tenis já está cadastrado no estoque, remova-o antes', 'OK');
        add = false;
      }
    });

    if (add) {
      this.venda.tenis_venda.push({
        tenis: {
          id: this.venda.tenis_atual,
          nome: nome
        },
        quantidade: this.venda.quantidade
      });
    }
  }

  removerItem(i) {
    this.venda.tenis_venda.splice(i, 1);
  }
}
