import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../../services/marca.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-marca-list',
  templateUrl: './marca-list.component.html',
  styleUrls: ['./marca-list.component.css']
})
export class MarcaListComponent implements OnInit {
  public marcas: any;

  public visibleColumns: string[] = [
    'nome',
    'avaliacao_media',
    'buttons'
  ];

  constructor(private marcaService: MarcaService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.marcaService.get().subscribe(
      data => this.marcas = data,
      error => this.snackBar.open('Erro ao listar marcas ' + error.message, 'OK')
    );
  }

  excluir(id: String) {
    if (confirm("Deseja realmente excluir a marca?")) {
      this.marcaService.delete(id).subscribe(
        () => {
          this.snackBar.open('Marca excluída com sucesso', 'Ok', { duration: 2000 });
          this.ngOnInit();
        },
        error => this.snackBar.open(error.error.message, 'OK'));
    }
  }
}
