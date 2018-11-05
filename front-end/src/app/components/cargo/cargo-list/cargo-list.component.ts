import { Component, OnInit } from '@angular/core';
import { CargoService } from '../../../services/cargo.service';

@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html',
  styleUrls: ['./cargo-list.component.css']
})
export class CargoListComponent implements OnInit {
  public cargos: any;

  public visibleColumns: string[] = [
    'nome',
    'nivel_hierarquico'
  ];

  constructor(private cadarcoService: CargoService) { }

  ngOnInit() {
    this.cadarcoService.get().subscribe(
      data => this.cargos = data,
      error => console.error(error.message)
    );
  }
}
