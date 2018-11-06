import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get('http://localhost:3000/marcas');
  }

  getById(id: String) {
    return this.http.get('http://localhost:3000/marcas/' + id);
  }

  post(marca) {
    return this.http.post('http://localhost:3000/marcas', marca);
  }

  put(id, marca) {
    return this.http.put('http://localhost:3000/marcas/' + id, marca);
  }

  delete(id: String) {
    return this.http.delete('http://localhost:3000/marcas/' + id);
  }
}
