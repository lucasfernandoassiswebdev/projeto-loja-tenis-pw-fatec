import { Component, OnInit } from '@angular/core';
import { CargoService } from '../../../services/cargo.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html',
  styleUrls: ['./cargo-list.component.css']
})
export class CargoListComponent implements OnInit {
  public cargos: any;

  public visibleColumns: string[] = [
    'nome',
    'nivel_hierarquico',
    'buttons'
  ];

  constructor(private cargoService: CargoService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.cargoService.get().subscribe(
      data => this.cargos = data,
      error => console.error(error.message)
    );
  }

  excluir(id: String) {
    if (confirm("Deseja realmente excluir o cargo?")) {
      this.cargoService.delete(id).subscribe(
        () => {
          this.snackBar.open('Cadarço excluído com sucesso', 'Ok', { duration: 2000 });
          this.ngOnInit();
        },
        error => this.snackBar.open(error.error.message, 'OK')
      )
    }
  }
}
