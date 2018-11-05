import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get('http://localhost:3000/cargos');
  }

  getById(id: String) {
    return this.http.get('http://localhost:3000/cargos/' + id);
  }

  post(cargo) {
    return this.http.post('http://localhost:3000/cargos', cargo);
  }

  put(id, cargo) {
    return this.http.put('http://localhost:3000/cargos/' + id, cargo);
  }

  delete(id: String) {
    return this.http.delete('http://localhost:3000/cargos/' + id);
  }
}
