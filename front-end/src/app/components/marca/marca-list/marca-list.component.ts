import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../../services/marca.service';

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

  constructor(private marcaService: MarcaService) { }

  ngOnInit() {
    this.marcaService.get().subscribe(
      data => this.marcas = data,
      error => console.error(error.message)
    );
  }
}
