import { QuestionDto } from 'src/app/dto/questionDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpResponse } from '../common/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getAllQuestionByIdQuiz(idQuiz:string): Observable<QuestionDto[]> {
    let request : string;
    request =`${this.host}/question/list/${idQuiz}`;
    console.log(request);
    return this.http.get<QuestionDto[]>(request);
  }

  public register(questionDto: QuestionDto): Observable<QuestionDto> {
    let request : string;
    request =`${this.host}/question/register`;
    console.log(request);
    return this.http.post<QuestionDto>(request, questionDto);
  }

  public getByIdQuestion(idQuestion:string): Observable<QuestionDto> {
    let request : string;
    request =`${this.host}/question/find/${idQuestion}`;
    console.log(request);
    return this.http.get<QuestionDto>(request);
  }

  public updateQuestion(questionDto: QuestionDto): Observable<QuestionDto> {
    let request : string;
    request =`${this.host}/question/update`;
    console.log(request);
    return this.http.put<QuestionDto>(request, questionDto);
  }

  public deleteQuestion(idQuestion: string): Observable<CustomHttpResponse> {
    let request : string;
    request =`${this.host}/question/delete/${idQuestion}`;
    console.log(request);
    return this.http.delete<CustomHttpResponse>(request);
  }

}
