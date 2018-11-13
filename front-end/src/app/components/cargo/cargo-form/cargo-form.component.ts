import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CargoService } from '../../../services/cargo.service';

@Component({
  selector: 'app-cargo-form',
  templateUrl: './cargo-form.component.html',
  styleUrls: ['./cargo-form.component.css']
})
export class CargoFormComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cargoService: CargoService
  ) { }

  public titulo: String = 'Novo Cargo';
  public cargo: any = {};

  ngOnInit() {
      this.activeRoute.params.subscribe(
        params => {
          if (params.id) {
            this.cargoService.getById(params.id).subscribe(
              obj => {
                this.cargo = obj;
                this.titulo = 'Editar Cargo';
              },
              erro => console.error(erro)
            )
          }
        }
      );
  }
}
