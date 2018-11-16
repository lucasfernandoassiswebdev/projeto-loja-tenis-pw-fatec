import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TenisService } from '../../../services/tenis.service';
import { MarcaService } from '../../../services/marca.service';
import { CadarcoService } from '../../../services/cadarco.service';
import { SolaService } from '../../../services/sola.service';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-tenis-form',
  templateUrl: './tenis-form.component.html',
  styleUrls: ['./tenis-form.component.css']
})
export class TenisFormComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private tenisService: TenisService,
    private marcaService: MarcaService,
    private cadarcoService: CadarcoService,
    private solaService: SolaService,
    private snackBar: MatSnackBar
  ) { }

  public titulo: String = 'Novo Tênis';
  public tenis: any = {
    marca: {},
    tipo_cadarco: {},
    tipo_sola: {},
    estoque: [{
      tamanho: 0,
      quantidade_disponivel: 0
    }]
  };
  public marcas: any = [];
  public cadarcos: any = [];
  public solas: any = [];

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => {
        if (params.id) {
          this.tenisService.getById(params.id).subscribe(
            obj => {
              this.tenis = obj;
              this.titulo = 'Editar Tênis';
            },
            error => this.snackBar.open('Erro ao buscar dados do tênis ' + error.message, 'OK')
          )
        }
      }
    );

    this.marcaService.get().subscribe(
      data => this.marcas = data,
      error => this.snackBar.open('Erro ao buscar marcas ' + error.message, 'OK')
    );

    this.cadarcoService.get().subscribe(
      data => this.cadarcos = data,
      error => this.snackBar.open('Erro ao buscar cadarços ' + error.message, 'OK')
    );

    this.solaService.get().subscribe(
      data => this.solas = data,
      error => this.snackBar.open('Erro ao buscar solas ' + error.message, 'OK')
    );
  }

  salvar() {
    let retorno: any;
    if (this.tenis._id) {
      retorno = this.tenisService.put(this.tenis._id, this.tenis);
    } else {
      retorno = this.tenisService.post(this.tenis);
    }
    retorno.subscribe(
      () => {
        this.snackBar.open('Tênis salvo com sucesso', 'OK', { duration: 2000 });
        this.router.navigate(['tenis']);
      },
      error => {
        this.snackBar.open(error.error.message, 'OK');
      }
    );
  }

  cancelar() {
    if (confirm('Deseja realmente cancelar as alterações?')) {
      this.router.navigate(['tenis']);
    }
  }

  adicionarItem() {
    console.log(this.tenis.estoque);
    this.tenis.estoque.push({
      tamanho: 0,
      quantidade_disponivel: 0
    });
  }
}
