import { Quiz } from './../../common/quiz';
import { Role } from './../../enum/role.enum';
import { QuizService } from 'src/app/service/quiz.service';
import { Tema } from './../../common/tema';
import { User } from './../../common/user';
import { DomSanitizer } from '@angular/platform-browser';
import { TemaService } from './../../service/tema.service';
import { NotificationService } from './../../service/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../../service/authentication.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from './../../enum/notification-type.enum';
import { CustomHttpResponse } from './../../common/custom-http-response';
import { QuizDto } from 'src/app/dto/quizDto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  public nombreCurso: string;
  public quizzes: QuizDto[];
  public editQuiz: QuizDto;
  public currentNombre: string;
  public user: User;
  public tema: Tema;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private temaService: TemaService,
    private _sanitizer: DomSanitizer,
    private quizService : QuizService
  ) {}
  ngOnInit() {
    this.editQuiz = new QuizDto();
    this.user = this.authenticationService.getUserFromLocalCache();
    this.route.queryParams.subscribe((params) => {
      this.nombreCurso = params.nombreCurso;
      this.getTemaActual(params.idTema);
    });
  }

  getTemaActual(idTema: bigint) {
    this.temaService.getTemaById(idTema.toString()).subscribe((response: Tema) => {
      this.tema = response;
      this.getQuizzes(response.idTema.toString(), true);
    });
  }
  getQuizzes(idTema: string, showNotification: boolean) {
    this.quizService.getAllQuizByIdTema(idTema).subscribe(
      (response: QuizDto[]) => {
        this.quizzes = response;
        if (showNotification) {
          this.sendNotification(
            NotificationType.SUCCESS,
            `${response.length} examenes cargados exitosamente.`
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

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN;
  }

  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }

  public saveNewQuiz(): void {
    this.clickButton('new-quiz-save');
  }

  public onUpdateQuiz(): void {
    this.quizService.updateQuiz(this.editQuiz).subscribe(
      (response: QuizDto) => {
        this.clickButton('closeEditQuizModalButton');
        this.getTemaActual(this.tema.idTema);
        this.sendNotification(NotificationType.SUCCESS, `Examen: ${response.title} actualizado exitosamente`);
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    );
  }

  public onAddNewQuiz(quizDto: QuizDto): void {
    quizDto.idTema = this.tema.idTema.toString();
    this.quizService.register(quizDto).subscribe(
      (response: QuizDto) => {
        this.clickButton('new-quiz-close');
        this.getTemaActual(this.tema.idTema);
        this.sendNotification(NotificationType.SUCCESS, `Quiz: ${response.title} registrado exitosamente`);
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    );
  }

  public onRegresar(): void {
    this.router.navigate(['/recurso/management'], {
     queryParams: { nombreCurso: this.nombreCurso, idTema: this.tema.idTema }
    });
  }

  public onEditQuiz(quizDto: QuizDto): void {
    this.editQuiz = quizDto;
    this.clickButton('openQuizEdit');
  }

  public onSeeQuestion(idQuiz:string): void{
    this.router.navigate(['/question/management'], {
      queryParams: { nombreCurso: this.nombreCurso, idTema: this.tema.idTema, idQuiz: idQuiz }
     });
  }

  public onDeleteQuiz(idQuiz: bigint): void {
    if (
      confirm(
        '¿Está seguro de eliminar el examen?'
      )
    ) {
    this.quizService.deleteQuiz(idQuiz.toString()).subscribe(
      (response: CustomHttpResponse) => {
        this.sendNotification(NotificationType.SUCCESS, response.message);
        this.getTemaActual(this.tema.idTema);
      },
      (error: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, error.error.message);
      }
    );
    }
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
