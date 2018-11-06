import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolaService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get('http://localhost:3000/solas');
  }

  getById(id: String) {
    return this.http.get('http://localhost:3000/solas/' + id);
  }

  post(sola) {
    return this.http.post('http://localhost:3000/solas', sola);
  }

  put(id, sola) {
    return this.http.put('http://localhost:3000/solas/' + id, sola);
  }

  delete(id: String) {
    return this.http.delete('http://localhost:3000/solas/' + id);
  }
}
