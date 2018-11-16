import { Component, OnInit } from '@angular/core';
import { TenisService } from '../../../services/tenis.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-tenis-list',
  templateUrl: './tenis-list.component.html',
  styleUrls: ['./tenis-list.component.css']
})
export class TenisListComponent implements OnInit {
  public tenis: any;

  public visibleColumns: string[] = [
    'nome',
    'marca',
    'cadarco',
    'sola',
    'valor',
    'buttons'
  ];

  constructor(private tenisService: TenisService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.tenisService.get().subscribe(
      data => this.tenis = data,
      error => this.snackBar.open('Erro ao listar tênis ' + error.message, 'OK')
    );
  }

  excluir(id: String) {
    if (confirm("Deseja realmente excluir o tênis?")) {
      this.tenisService.delete(id).subscribe(
        () => {
          this.snackBar.open('Tênis excluído com sucesso', 'Ok', { duration: 2000 });
          this.ngOnInit();
        },
        error => this.snackBar.open(error.error.message, 'OK'));
    }
  }
}
