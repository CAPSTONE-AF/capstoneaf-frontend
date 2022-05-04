import { User } from './../../common/user';
import { AuthenticationService } from './../../service/authentication.service';
import { Avance } from './../../common/avance';
import { AvanceService } from './../../service/avance.service';
import { TemaService } from 'src/app/service/tema.service';
import { Tema } from './../../common/tema';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recurso } from 'src/app/common/recurso';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { NotificationService } from 'src/app/service/notification.service';
import { RecursoService } from 'src/app/service/recurso.service';
import { NgForm } from '@angular/forms';
import { CustomHttpResponse } from 'src/app/common/custom-http-response';
import { AvanceDto } from 'src/app/dto/avanceDto';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.css'],
})
export class RecursoComponent implements OnInit {
  public nombreCurso: string;
  public idTema: bigint;
  public recursos: Recurso[];
  public editRecurso: Recurso;
  public currentNombre: string;
  public optionValue: string;
  fileName: string;
  tituloTema: string;
  contenidoImagen: File;
  public tema: Tema;
  public user: User;
  public avance: Avance;

  constructor(
    private recursoService: RecursoService,
    private avanceService: AvanceService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private temaService: TemaService
  ) {}

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.route.queryParams.subscribe((params) => {
      this.nombreCurso = params.nombreCurso;
      this.getTemaActual(params.idTema);
    });



    this.editRecurso = new Recurso();
  }

  getTemaActual(idTema: bigint) {
    this.temaService.getTemaById(idTema).subscribe((response: Tema) => {
      this.tema = response;
      this.tituloTema = this.tema.titulo;
      this.registrarAvance();
      this.getRecursos(this.nombreCurso, this.tituloTema, true);
    });
  }

  registrarAvance() {
    this.avanceService.registerAvance(new AvanceDto(this.user.id, this.tema.idTema)).subscribe();
  }

  public onRegresar(): void {
    this.router.navigate(['/tema/management'], {
      queryParams: { nombreCurso: this.nombreCurso },
    });
  }

  public oContenidoImageChange(fileName: string, imagen: File): void {
    this.fileName = fileName;
    this.contenidoImagen = imagen;
  }

  public getRecursos(
    nombreCurso: string,
    tituloTema: string,
    showNotification: boolean
  ): void {
    this.recursoService.getRecursos(nombreCurso, tituloTema).subscribe(
      (response: Recurso[]) => {
        this.recursos = response;
        if (showNotification) {
          this.sendNotification(
            NotificationType.SUCCESS,
            `${response.length} recurso(s) cargado(s) exitosamente.`
          );
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(
          NotificationType.ERROR,
          errorResponse.error.message
        );
      }
    );
  }

  public saveNewRecurso(): void {
    this.clickButton('new-recurso-save');
  }

  public onAddNewRecurso(recursoForm: NgForm): void {
    console.log(recursoForm.value);
    const formData = this.recursoService.createRecursoFormDate(
      this.nombreCurso,
      this.tituloTema,
      null,
      recursoForm.value
    );
    this.recursoService.addRecurso(formData).subscribe(
      (response: Recurso) => {
        this.clickButton('new-recurso-close');
        this.getRecursos(this.nombreCurso, this.tituloTema, false);
        recursoForm.reset();
        this.sendNotification(
          NotificationType.SUCCESS,
          `Recurso: ${response.nombre} registrado exitosamente`
        );
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(
          NotificationType.ERROR,
          errorResponse.error.message
        );
      }
    );
  }

  public onEditRecurso(editRecurso: Recurso): void {
    this.editRecurso = editRecurso;
    this.currentNombre = editRecurso.nombre;
    console.log(editRecurso.nombre);
    this.clickButton('openRecursoEdit');
  }

  public onUpdateRecurso(): void {
    const formData = this.recursoService.createRecursoFormDate(
      this.nombreCurso,
      this.tituloTema,
      this.currentNombre,
      this.editRecurso
    );
    this.recursoService.updateRecurso(formData).subscribe(
      (response: Recurso) => {
        this.clickButton('closeEditRecursoModalButton');
        this.getRecursos(this.nombreCurso, this.tituloTema, false);
        this.sendNotification(
          NotificationType.SUCCESS,
          `Recurso: ${response.nombre} actualizado exitosamente`
        );
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(
          NotificationType.ERROR,
          errorResponse.error.message
        );
      }
    );
  }

  public onDeleteRecurso(nombre: string): void {
    this.recursoService
      .deleteRecurso(this.nombreCurso, this.tituloTema, nombre)
      .subscribe(
        (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getRecursos(this.nombreCurso, this.tituloTema, false);
        },
        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, error.error.message);
        }
      );
  }

  private sendNotification(
    notificationType: NotificationType,
    message: string
  ): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(
        notificationType,
        'Ocurrió un error. Inténtalo de nuevo.'
      );
    }
  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }
}
