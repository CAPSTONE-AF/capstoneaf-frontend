import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpResponse } from '../common/custom-http-response';
import { Tema } from '../common/tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }


  public getTemas(nombreCurso: string): Observable<Tema[]> {
    return this.http.get<Tema[]>(`${this.host}/tema/list/${nombreCurso}`);
  }

  public addTema(formData: FormData): Observable<Tema> {
    return this.http.post<Tema>(`${this.host}/tema/add`, formData);
  }

  public updateTema(formData: FormData): Observable<Tema> {
    return this.http.post<Tema>(`${this.host}/tema/update`, formData);
  }

  public updatePortadaImage(formData: FormData): Observable<HttpEvent<Tema>> {
    return this.http.post<Tema>(`${this.host}/tema/updatePortadaImage`, formData,
    {reportProgress: true,
      observe: 'events'
    });
  }

  public deleteTema(nombreCurso: string, titulo: string): Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/tema/delete/${nombreCurso}/${titulo}`);
  }

  public createTemaFormDate(nombreCurso: string, currentTitulo: string,tema: Tema, portadaUrl: File,id:bigint): FormData {
    const formData = new FormData();
    formData.append('nombreCurso', nombreCurso);
    formData.append('currentTitulo', currentTitulo);
    formData.append('titulo', tema.titulo);
    formData.append('portadaUrl', portadaUrl);
    formData.append('idUser', id.toString());
    return formData;
  }

}
