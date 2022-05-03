import { AvanceDto } from './../dto/avanceDto';
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

  public getAllAvancesByUserId(userId: bigint): Observable<Avance[]> {
    return this.http.get<Avance[]>(`${this.host}/avances/list/${userId}`);
  }

  public registerAvance(avanceDto: AvanceDto): Observable<Object> {
    return this.http.post<Avance>(`${this.host}/avances/register`, avanceDto);
  }


}
