import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get('http://localhost:3000/vendas');
  }

  getById(id: String) {
    return this.http.get('http://localhost:3000/vendas/' + id);
  }

  post(venda) {
    return this.http.post('http://localhost:3000/vendas', venda);
  }

  put(id, venda) {
    return this.http.put('http://localhost:3000/vendas/' + id, venda);
  }

  delete(id: String) {
    return this.http.delete('http://localhost:3000/vendas/' + id);
  }
}
