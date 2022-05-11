import { Role } from './../../enum/role.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Curso } from 'src/app/common/curso';
import { CustomHttpResponse } from 'src/app/common/custom-http-response';
import { User } from 'src/app/common/user';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CursoService } from 'src/app/service/curso.service';
import { NotificationService } from 'src/app/service/notification.service';
import { TemaService } from 'src/app/service/tema.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  public cursos: Curso[];
  public editCurso: Curso;
  public currentNombre: string;
  public user: User;

  constructor(private cursoService: CursoService, private temaService: TemaService, private router: Router,
    private notificationService: NotificationService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getCursos(true);
    this.editCurso = new Curso();
    this.user = this.authenticationService.getUserFromLocalCache();
  }

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN;
  }

  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }

  public saveNewCurso(): void {
    this.clickButton('new-curso-save');
  }

  public getCursos(showNotification: boolean): void {
    this.cursoService.getCursos().subscribe(
      (response: Curso[]) => {
        this.cursos = response;
        if (showNotification) {
          this.sendNotification(NotificationType.SUCCESS, `${response.length} curso(s) cargado(s) exitosamente.`);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    );
  }

  public onUpdateCurso(): void {
    const formData = this.cursoService.createCursoFormDate(this.currentNombre, this.editCurso,this.user.id);
    this.cursoService.updateCurso(formData).subscribe(
      (response: Curso) => {
        this.clickButton('closeEditCursoModalButton');
        this.getCursos(false);
        this.sendNotification(NotificationType.SUCCESS, `Curso: ${response.nombre} actualizado exitosamente`);
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    );
  }

  public onAddNewCurso(cursoForm: NgForm): void {
    const formData = this.cursoService.createCursoFormDate(null, cursoForm.value, this.user.id);
    this.cursoService.addCurso(formData).subscribe(
      (response: Curso) => {
        this.clickButton('new-curso-close');
        this.getCursos(false);
        cursoForm.reset();
        this.sendNotification(NotificationType.SUCCESS, `Curso: ${response.nombre} registrado exitosamente`);
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    );
  }

  public onEditCurso(editCurso: Curso): void {
    this.editCurso = editCurso;
    this.currentNombre = editCurso.nombre;
    this.clickButton('openCursoEdit');
  }

  public onDeleteCurso(nombre: string): void {
    this.cursoService.deleteCurso(nombre).subscribe(
      (response: CustomHttpResponse) => {
        this.sendNotification(NotificationType.SUCCESS, response.message);
        this.getCursos(false);
      },
      (error: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, error.error.message);
      }
    );
  }

  public onManageTemas(nombreCurso: string): void {
    this.router.navigate(['/tema/management'], {
      queryParams: { 'nombreCurso': nombreCurso }
    });
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'Ocurrió un error. Inténtalo de nuevo.');
    }
  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }


}
