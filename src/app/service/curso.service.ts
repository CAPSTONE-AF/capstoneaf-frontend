import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Curso } from '../common/curso';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpResponse } from '../common/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.host}/curso/list`);
  }

  public addCurso(formData: FormData): Observable<Curso> {
    return this.http.post<Curso>(`${this.host}/curso/add`, formData);
  }

  public updateCurso(formData: FormData): Observable<Curso> {
    return this.http.post<Curso>(`${this.host}/curso/update`, formData);
  }

  public deleteCurso(nombre: string): Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/curso/delete/${nombre}`);
  }

  public findCurso(nombreCurso: string): Observable<Curso> {
    return this.http.get<Curso>(`${this.host}/curso/find/${nombreCurso}`);
    
  }

  public createCursoFormDate(currentNombre: string, curso: Curso): FormData {
    const formData = new FormData();
    formData.append('currentNombre', currentNombre);
    formData.append('nombre', curso.nombre);
    return formData;
  }

}
