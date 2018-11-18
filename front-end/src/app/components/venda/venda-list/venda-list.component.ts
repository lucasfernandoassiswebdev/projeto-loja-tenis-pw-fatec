import { Component, OnInit } from '@angular/core';
import { VendaService } from '../../../services/venda.service';
import { MatSnackBar } from '@angular/material';

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

  constructor(private vendasService: VendaService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.vendasService.get().subscribe(
      data => this.vendas = data,
      error => console.error(error.message)
    );
  }

  excluir(id: String) {
    if (confirm("Deseja realmente excluir a venda?")) {
      this.vendasService.delete(id).subscribe(
        () => {
          this.snackBar.open('Venda excluída com sucesso', 'Ok', { duration: 2000 });
          this.ngOnInit();
        },
        error => this.snackBar.open(error.error.message, 'OK'));
    }
  }
}
