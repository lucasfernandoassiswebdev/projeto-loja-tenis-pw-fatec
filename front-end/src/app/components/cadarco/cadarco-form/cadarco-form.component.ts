import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CadarcoService } from '../../../services/cadarco.service';

@Component({
  selector: 'app-cadarco-form',
  templateUrl: './cadarco-form.component.html',
  styleUrls: ['./cadarco-form.component.css']
})
export class CadarcoFormComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cadarcoService: CadarcoService
  ) { }

  public titulo: String = 'Novo Cadarço';
  public cadarco: any = {};

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => {
        if (params.id) {
          this.cadarcoService.getById(params.id).subscribe(
            obj => {
              this.cadarco = obj;
              this.titulo = 'Editar Cadarço';
            },
            erro => console.error(erro)
          )
        }
      }
    );
  }
}
