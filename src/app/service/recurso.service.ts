import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpResponse } from '../common/custom-http-response';
import { Recurso } from '../common/recurso';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getRecursos(nombreCurso: string, tituloTema: string): Observable<Recurso[]> {
    return this.http.get<Recurso[]>(`${this.host}/recurso/list/${nombreCurso}/${tituloTema}`);
  }

  public addRecurso(formData: FormData): Observable<Recurso> {
    return this.http.post<Recurso>(`${this.host}/recurso/add`, formData);
  }

  public updateRecurso(formData: FormData): Observable<Recurso> {
    return this.http.post<Recurso>(`${this.host}/recurso/update`, formData);
  }


  public deleteRecurso(nombreCurso: string, tituloTema: string, nombre: string): Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/recurso/delete/${nombreCurso}/${tituloTema}/${nombre}`);
  }

  public createRecursoFormDate(nombreCurso: string, tituloTema: string, currentNombre: string, recurso: Recurso): FormData {
    const formData = new FormData();
    formData.append('nombreCurso', nombreCurso);
    formData.append('tituloTema', tituloTema);
    formData.append('nombre', recurso.nombre);
    formData.append('currentNombre', currentNombre);
    formData.append('tipo', recurso.tipo);
    formData.append('contenido', recurso.contenido);
    return formData;
  }
}
