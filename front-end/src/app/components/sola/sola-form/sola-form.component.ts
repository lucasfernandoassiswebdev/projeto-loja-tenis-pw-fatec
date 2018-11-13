import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SolaService } from '../../../services/sola.service';

@Component({
  selector: 'app-sola-form',
  templateUrl: './sola-form.component.html',
  styleUrls: ['./sola-form.component.css']
})
export class SolaFormComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private solaService: SolaService
  ) { }

  public titulo: String = 'Nova Sola';
  public sola: any = {};

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => {
        if (params.id) {
          this.solaService.getById(params.id).subscribe(
            obj => {
              this.sola = obj;
              this.titulo = 'Editar Sola';
            },
            erro => console.error(erro)
          )
        }
      }
    );
  }

}
