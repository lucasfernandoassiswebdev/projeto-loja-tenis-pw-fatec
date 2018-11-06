import { Component, OnInit } from '@angular/core';
import { SolaService } from '../../../services/sola.service';

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

  constructor(private solaService: SolaService) { }

  ngOnInit() {
    this.solaService.get().subscribe(
      data => this.solas = data,
      error => console.error(error.message)
    );
  }
}
