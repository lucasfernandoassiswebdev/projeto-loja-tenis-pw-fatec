import { Component, OnInit } from '@angular/core';
import { SolaService } from '../../../services/sola.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sola-list',
  templateUrl: './sola-list.component.html',
  styleUrls: ['./sola-list.component.css']
})
export class SolaListComponent implements OnInit {
  public solas: any;

  public visibleColumns: string[] = [
    'nome',
    'durabilidade_media',
    'valor',
    'buttons'
  ];

  constructor(private solaService: SolaService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.solaService.get().subscribe(
      data => this.solas = data,
      error => this.snackBar.open('Erro ao listar solas ' + error.message, 'OK')
    );
  }

  excluir(id: String) {
    if (confirm("Deseja realmente excluir a sola?")) {
      this.solaService.delete(id).subscribe(
        () => {
          this.snackBar.open('Sola excluída com sucesso', 'Ok', { duration: 2000 });
          this.ngOnInit();
        },
        error => this.snackBar.open(error.error.message, 'OK'));
    }
  }
}
