import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Tema } from 'src/app/common/tema';
import { QuizDto } from './../../dto/quizDto';
import { Result } from './../../common/result';
import { User } from 'src/app/common/user';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from './../../service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Router } from '@angular/router';
import { QuizService } from './../../service/quiz.service';
import { TemaService } from 'src/app/service/tema.service';
import { ResultService } from './../../service/result.service';
import { ResultDto } from './../../dto/resultDto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-notas',
  templateUrl: './historial-notas.component.html',
  styleUrls: ['./historial-notas.component.css']
})
export class HistorialNotasComponent implements OnInit {

  public results: ResultDto[];
  public resultModels: Result[];
  public user: User;

  constructor(
    private resultService: ResultService,
    private quizService: QuizService,
    private temaService: TemaService,
    private router: Router,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.results = [];
    this.resultModels = [];
    this.user = this.authenticationService.getUserFromLocalCache();
    this.getResults(true);
  }

  public getResults(showNotification: boolean): void {
    this.resultService
      .findaAllByUserId(this.user.id.toString())
      .subscribe((response: ResultDto[]) => {

        for (let resultDto of response) {
          this.quizService
            .getByIdQuiz(resultDto.idQuiz)
            .subscribe((resp1: QuizDto) => {

                this.temaService
              .getTemaById(resp1.idTema)
              .subscribe((resp2: Tema) => {


                resultDto.temaTitle = resp2.titulo;

                this.results = response;

            });
            });
        }

      });
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
