import { Component, OnInit } from '@angular/core';
import { CadarcoService } from '../../../services/cadarco.service';

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

  constructor(private cadarcoService: CadarcoService) { }

  ngOnInit() {
    this.cadarcoService.get().subscribe(
      data => this.cadarcos = data,
      error => console.error(error.message)
    );
  }
}
