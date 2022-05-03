import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/common/curso';
import { CustomHttpResponse } from 'src/app/common/custom-http-response';
import { Tema } from 'src/app/common/tema';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { CursoService } from 'src/app/service/curso.service';
import { NotificationService } from 'src/app/service/notification.service';
import { TemaService } from 'src/app/service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  public temas: Tema[];
  public editTema: Tema;
  public curso: Curso;
  public currentTitulo: string;
  public fileName: string;
  public portadaUrl: File;
  public nombreCurso: any;

  constructor(private temaService: TemaService,private route:ActivatedRoute,private router:Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.nombreCurso = params.nombreCurso;
      });
    this.getTemas(this.nombreCurso,true);
    this.editTema = new Tema();
  }


  public getTemas(nombreCurso: string,showNotification: boolean): void {
    this.temaService.getTemas(nombreCurso).subscribe(
      (response: Tema[]) => {
        this.temas = response;
        if (showNotification) {
          this.sendNotification(NotificationType.SUCCESS, `${response.length} tema(s) cargado(s) exitosamente.`);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    );

}


public saveNewTema(): void {
  this.clickButton('new-tema-save');
}

public onAddNewTema(temaForm: NgForm): void {
  const formData = this.temaService.createTemaFormDate(this.nombreCurso, null, temaForm.value, this.portadaUrl);
    this.temaService.addTema(formData).subscribe(
      (response: Tema) => {
        this.clickButton('new-tema-close');
        this.getTemas(this.nombreCurso,false);
        this.fileName = null;
        this.portadaUrl = null;
        temaForm.reset();
        this.sendNotification(NotificationType.SUCCESS, `Tema: ${response.titulo} registrado exitosamente`);
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.portadaUrl = null;
      }
    );
}



public onUpdateTema(): void {
  const formData = this.temaService.createTemaFormDate(this.nombreCurso,this.currentTitulo, this.editTema, this.portadaUrl);
    this.temaService.updateTema(formData).subscribe(
      (response: Tema) => {
        this.clickButton('closeEditTemaModalButton');
        this.fileName = null;
        this.portadaUrl = null;
        this.getTemas(this.nombreCurso,false);
        this.sendNotification(NotificationType.SUCCESS, `Tema: ${response.titulo} actualizado exitosamente`);
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.portadaUrl = null;
      }
    )
}

public onRegresar(): void {
  this.router.navigate(['/curso/management']);
}

public onPortadaImageChange(fileName: string, portadaUrl: File): void {
  this.fileName =  fileName;
  this.portadaUrl = portadaUrl;
}


public onEditTema(editTema: Tema): void {
  this.editTema = editTema;
  this.currentTitulo = editTema.titulo;
  this.clickButton('openTemaEdit');
}

public onDeleteTema(titulo: string,): void {
  this.temaService.deleteTema(this.nombreCurso,titulo).subscribe(
    (response: CustomHttpResponse) => {
      this.sendNotification(NotificationType.SUCCESS, response.message);
      this.getTemas(this.nombreCurso,false);
    },
    (error: HttpErrorResponse) => {
      this.sendNotification(NotificationType.ERROR, error.error.message);
    }
  );
}

public onManageRecursos(idTema: string): void {
  this.router.navigate(['/recurso/management'],{
    queryParams: { 'nombreCurso': this.nombreCurso, 'idTema': idTema}
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
