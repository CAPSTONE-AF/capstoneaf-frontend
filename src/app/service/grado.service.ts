import { Grado } from './../common/grado';
import { AvanceDto } from './../dto/avanceDto';
import { Avance } from './../common/avance';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GradoService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getAllGrados(): Observable<Grado[]> {
    let request : string;
    request =`${this.host}/grados/list`;
    console.log(request);
    return this.http.get<Grado[]>(request);
  }

  public getGradoById(idGrado: bigint): Observable<Grado> {
    let request : string;
    request =`${this.host}/grados/find/${idGrado}`;
    console.log(request);
    return this.http.get<Grado>(request);
  }


}
