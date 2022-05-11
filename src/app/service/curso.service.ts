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
    let request : string;
    request =`${this.host}/curso/list`;
    console.log(request);
    return this.http.get<Curso[]>(request);
  }

  public addCurso(formData: FormData): Observable<Curso> {
    let request : string;
    request =`${this.host}/curso/add`;
    console.log(request);
    return this.http.post<Curso>(request, formData);
  }

  public updateCurso(formData: FormData): Observable<Curso> {
    let request : string;
    request =`${this.host}/curso/update`;
    console.log(request);
    return this.http.post<Curso>(request, formData);
  }

  public exportarPieChartPopCursos(): Observable<Blob> {
    let request : string;
    request =`${this.host}/curso/exportar/piechart/pop_cursos/pdf`;
    console.log(request);
    return this.http.get<Blob>(request);
  }

  public deleteCurso(nombre: string): Observable<CustomHttpResponse> {
    let request : string;
    request =`${this.host}/curso/delete/${nombre}`;
    console.log(request);
    return this.http.delete<CustomHttpResponse>(request);
  }

  public findCurso(nombreCurso: string): Observable<Curso> {
    let request : string;
    request =`${this.host}/curso/find/${nombreCurso}`;
    console.log(request);
    return this.http.get<Curso>(request);

  }

  public createCursoFormDate(currentNombre: string, curso: Curso, id:bigint): FormData {
    const formData = new FormData();
    formData.append('currentNombre', currentNombre);
    formData.append('nombre', curso.nombre);
    formData.append('idUser', id.toString());
    return formData;
  }
}
