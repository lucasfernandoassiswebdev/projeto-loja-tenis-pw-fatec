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
      error => console.error(error.message)
    );
  }

  excluir(id: String) {
    if (confirm("Deseja realmente excluir a marca?")) {
      this.marcaService.delete(id).subscribe(
        () => {
          this.snackBar.open('Marca excluída com sucesso', 'Ok', { duration: 2000 });
          this.ngOnInit();
        },
        erro => this.snackBar.open('ERRO AO EXCLUIR MARCA', 'OK'));
    }
  }
}
