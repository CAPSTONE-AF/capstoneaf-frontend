import { AvanceDto } from 'src/app/dto/avanceDto';
import { Avance } from './../common/avance';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvanceService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getAllAvancesByUserId(userId: bigint): Observable<AvanceDto[]> {
    let request : string;
    request =`${this.host}/avances/list/${userId}`;
    console.log(request);
    return this.http.get<AvanceDto[]>(request);
  }

  public registerAvance(avanceDto: AvanceDto): Observable<Object> {
    let request : string;
    request =`${this.host}/avances/register`;
    console.log(request);
    return this.http.post<Avance>(request, avanceDto);
  }


}
