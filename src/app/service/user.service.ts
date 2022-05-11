import { UserDto } from './../dto/userDto';
import { Grado } from './../common/grado';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../common/user';
import { CustomHttpResponse } from '../common/custom-http-response';

@Injectable({providedIn: 'root'})
export class UserService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    let request : string;
    request =`${this.host}/user/list`;
    console.log(request);
    return this.http.get<User[]>(request);
  }

  public getGradoByUser(idUser:bigint): Observable<Grado> {
    let request : string;
    request =`${this.host}/user/userHasGrado/${idUser}`;
    console.log(request);
    return this.http.get<Grado>(request);
  }

  public addUser(formData: FormData): Observable<UserDto> {
    let request : string;
    request =`${this.host}/user/add`;
    console.log(request);
    return this.http.post<UserDto>(request, formData);
  }

  public updateUser(formData: FormData): Observable<UserDto> {
    let request : string;
    request =`${this.host}/user/update`;
    console.log(request);
    return this.http.post<UserDto>(request, formData);
  }

  public resetPassword(email: string): Observable<CustomHttpResponse> {
    let request : string;
    request =`${this.host}/user/resetpassword/${email}`;
    console.log(request);
    return this.http.get<CustomHttpResponse>(request);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User>> {
    let request : string;
    request =`${this.host}/user/updateProfileImage`;
    console.log(request);
    return this.http.post<User>(request, formData,
    {reportProgress: true,
      observe: 'events'
    });
  }

  public exportarBarChartNumUsuByGrado(): Observable<Blob> {
    let request : string;
    request =`${this.host}/user/exportar/barchart/num_usu_grado/pdf`;
    console.log(request);
    return this.http.get<Blob>(request);
  }

  public deleteUser(username: string): Observable<CustomHttpResponse> {
    let request : string;
    request =`${this.host}/user/delete/${username}`;
    console.log(request);
    return this.http.delete<CustomHttpResponse>(request);
  }

  public addUsersToLocalCache(users: User[]): void {
    console.log("addUsersToLocalCache");
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[] {
    console.log("getUsersFromLocalCache");
    if (localStorage.getItem('users')) {
      console.log("getItem");
        return JSON.parse(localStorage.getItem('users'));
    }
    return null;
  }

  public createUserFormDate(loggedInUsername: string, user: User, imageUrl: string, idGradoSeleccionado:bigint): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    if(user.role!=undefined)
      formData.append('role', user.role);
    if(imageUrl!=undefined)
      formData.append('profileImageUrl', imageUrl);
    if(idGradoSeleccionado!=undefined)
      formData.append('idGrado', JSON.stringify(idGradoSeleccionado));
    if(user.active!=undefined)
      formData.append('isActive', JSON.stringify(user.active));
    if(user.notLocked!=undefined)
      formData.append('isNonLocked', JSON.stringify(user.notLocked));
    return formData;
  }

}
