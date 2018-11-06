import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MarcaService } from '../../../services/marca.service';

@Component({
  selector: 'app-marca-form',
  templateUrl: './marca-form.component.html',
  styleUrls: ['./marca-form.component.css']
})
export class MarcaFormComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private marcaService: MarcaService
  ) { }

  public titulo: String = 'Nova Marca';
  public marca: any = {};

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => {
        if (params.id) {
          this.marcaService.getById(params.id).subscribe(
            obj => {
              this.marca = obj;
              console.log(obj);
              this.titulo = 'Editar Marca';
            },
            erro => console.error(erro)
          )
        }
      }
    );
  }
}
