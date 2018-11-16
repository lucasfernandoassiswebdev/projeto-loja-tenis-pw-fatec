import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TenisService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get('http://localhost:3000/tenis');
  }

  getById(id: String) {
    return this.http.get('http://localhost:3000/tenis/' + id);
  }

  post(tenis) {
    return this.http.post('http://localhost:3000/tenis', tenis);
  }

  put(id, tenis) {
    console.log(tenis);
    return this.http.put('http://localhost:3000/tenis/' + id, tenis);
  }

  delete(id: String) {
    return this.http.delete('http://localhost:3000/tenis/' + id);
  }
}
