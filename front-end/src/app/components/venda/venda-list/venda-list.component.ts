import { Component, OnInit } from '@angular/core';
import { VendaService } from '../../../services/venda.service';

@Component({
  selector: 'app-venda-list',
  templateUrl: './venda-list.component.html',
  styleUrls: ['./venda-list.component.css']
})
export class VendaListComponent implements OnInit {
  public vendas: any;

  public visibleColumns: string[] = [
    'id',
    'data',
    'funcionario',
    'cargo',
    'buttons'
  ];

  constructor(private vendasService: VendaService) { }

  ngOnInit() {
    this.vendasService.get().subscribe(
      data => this.vendas = data,
      error => console.error(error.message)
    );
  }
}
