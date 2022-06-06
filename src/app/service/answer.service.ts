import { AnswerDto } from 'src/app/dto/answerDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public registerAnswer(answersDto: AnswerDto[]): Observable<AnswerDto[]> {
    let request : string;
    request =`${this.host}/answer/register`;
    console.log(request);
    return this.http.post<AnswerDto[]>(request, answersDto);
  }


}
