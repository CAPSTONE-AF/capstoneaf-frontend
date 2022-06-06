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
    let request : string;
    request =`${this.host}/tema/list/${nombreCurso}`;
    console.log(request);
    return this.http.get<Tema[]>(request);
  }

  public getTemaById(idTema: string): Observable<Tema> {
    let request : string;
    request =`${this.host}/tema/find/${idTema}`;
    console.log(request);
    return this.http.get<Tema>(request);
  }

  public addTema(formData: FormData): Observable<Tema> {
    let request : string;
    request =`${this.host}/tema/add`;
    console.log(request);
    return this.http.post<Tema>(request, formData);
  }

  public updateTema(formData: FormData): Observable<Tema> {
    let request : string;
    request =`${this.host}/tema/update`;
    console.log(request);
    return this.http.post<Tema>(request, formData);
  }

  public updatePortadaImage(formData: FormData): Observable<HttpEvent<Tema>> {
    let request : string;
    request =`${this.host}/tema/updatePortadaImage`;
    console.log(request);
    return this.http.post<Tema>(request, formData,
    {reportProgress: true,
      observe: 'events'
    });
  }

  public deleteTema(nombreCurso: string, titulo: string): Observable<CustomHttpResponse> {
    let request : string;
    request =`${this.host}/tema/delete/${nombreCurso}/${titulo}`;
    console.log(request);
    return this.http.delete<CustomHttpResponse>(request);
  }

  public createTemaFormDate(nombreCurso: string, currentTitulo: string,tema: Tema, portadaUrl: string, id:bigint): FormData {
    const formData = new FormData();
    formData.append('nombreCurso', nombreCurso);
    formData.append('currentTitulo', currentTitulo);
    formData.append('titulo', tema.titulo);
    if(portadaUrl!=undefined)
      formData.append('portadaUrl', portadaUrl);
    formData.append('idUser', id.toString());
    return formData;
  }

}
