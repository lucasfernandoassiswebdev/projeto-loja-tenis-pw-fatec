import { Component, OnInit } from '@angular/core';
import { CadarcoService } from '../../../services/cadarco.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cadarco-list',
  templateUrl: './cadarco-list.component.html',
  styleUrls: ['./cadarco-list.component.css']
})
export class CadarcoListComponent implements OnInit {
  public cadarcos: any;

  public visibleColumns: string[] = [
    'nome',
    'material',
    'valor',
    'buttons'
  ];

  constructor(private cadarcoService: CadarcoService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.cadarcoService.get().subscribe(
      data => this.cadarcos = data,
      error => console.error(error.message)
    );
  }

  excluir(id: String) {
    if (confirm("Deseja realmente excluir o cadarço?")) {
      this.cadarcoService.delete(id).subscribe(
        () => {
          this.snackBar.open('Cadarço excluído com sucesso', 'Ok', { duration: 2000 });
          this.ngOnInit();
        },
        erro => this.snackBar.open('ERRO AO EXCLUIR CADARÇO', 'OK'));
    }
  }
}
