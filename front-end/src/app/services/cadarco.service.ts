import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CadarcoService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get('http://localhost:3000/cadarcos');
  }

  getById(id: String) {
    return this.http.get('http://localhost:3000/cadarcos/' + id);
  }

  post(cadarco) {
    return this.http.post('http://localhost:3000/cadarcos', cadarco);
  }

  put(id, cadarco) {
    return this.http.put('http://localhost:3000/cadarcos/' + id, cadarco);
  }

  delete(id: String) {
    return this.http.delete('http://localhost:3000/cadarcos/' + id);
  }
}
