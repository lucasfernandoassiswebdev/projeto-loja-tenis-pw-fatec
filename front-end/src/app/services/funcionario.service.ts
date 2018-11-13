import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private http: HttpClient) { }

  get() {
    // console.log('È o Pazuzu');
    return this.http.get('http://localhost:3000/funcionarios');
  }

  getById(id: String) {
    return this.http.get('http://localhost:3000/funcionarios/' + id);
  }

  post(funcionario) {
    return this.http.post('http://localhost:3000/funcionarios', funcionario);
  }

  put(id, funcionario) {
    return this.http.put('http://localhost:3000/funcionarios/' + id, funcionario);
  }

  delete(id: String) {
    return this.http.delete('http://localhost:3000/funcionarios/' + id);
  }
}
