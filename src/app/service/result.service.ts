import { ResultDto } from '../dto/ResultDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpResponse } from '../common/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public createNewResult(resultDto: ResultDto): Observable<ResultDto> {
    let request : string;
    request =`${this.host}/result/create`;
    console.log(request);
    return this.http.post<ResultDto>(request, resultDto);
  }

  public getResultByIdUserAndIdQuiz(idUser:string, idQuiz: string): Observable<ResultDto> {
    let request : string;
    request =`${this.host}/result/find/${idUser}/${idQuiz}`;
    console.log(request);
    return this.http.get<ResultDto>(request);
  }

  public findaAllByUserId(idUser:string): Observable<ResultDto[]> {
    let request : string;
    request =`${this.host}/result/list/${idUser}`;
    console.log(request);
    return this.http.get<ResultDto[]>(request);
  }

  public gradeQuiz(idResult:string): Observable<ResultDto> {
    let request : string;
    request =`${this.host}/result/grade/${idResult}`;
    console.log(request);
    return this.http.post<ResultDto>(request, null);
  }



}
