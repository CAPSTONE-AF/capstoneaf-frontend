import { QuizDto } from './../dto/QuizDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Quiz } from '../common/Quiz';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpResponse } from '../common/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getAllQuizByIdTema(idTema:string): Observable<QuizDto[]> {
    let request : string;
    request =`${this.host}/quiz/list/${idTema}`;
    console.log(request);
    return this.http.get<QuizDto[]>(request);
  }

  public register(quizDto: QuizDto): Observable<QuizDto> {
    let request : string;
    request =`${this.host}/quiz/register`;
    console.log(request);
    return this.http.post<QuizDto>(request, quizDto);
  }

  public getByIdQuiz(idQuiz:string): Observable<QuizDto> {
    let request : string;
    request =`${this.host}/quiz/find/${idQuiz}`;
    console.log(request);
    return this.http.get<QuizDto>(request);
  }

  public updateQuiz(quizDto: QuizDto): Observable<QuizDto> {
    let request : string;
    request =`${this.host}/quiz/update`;
    console.log(request);
    return this.http.put<QuizDto>(request, quizDto);
  }

  public deleteQuiz(idQuiz: string): Observable<CustomHttpResponse> {
    let request : string;
    request =`${this.host}/quiz/delete/${idQuiz}`;
    console.log(request);
    return this.http.delete<CustomHttpResponse>(request);
  }

}
