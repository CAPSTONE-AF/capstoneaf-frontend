import { AnswerService } from './../../service/answer.service';
import { ResultDto } from '../../dto/ResultDto';
import { ResultService } from './../../service/result.service';
import { AnswerDto } from '../../dto/AnswerDto';
import { CustomHttpResponse } from './../../common/custom-http-response';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from './../../enum/notification-type.enum';
import { Role } from './../../enum/role.enum';
import { QuestionService } from './../../service/question.service';
import { QuizService } from './../../service/quiz.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TemaService } from './../../service/tema.service';
import { NotificationService } from './../../service/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../../service/authentication.service';
import { Tema } from './../../common/tema';
import { User } from './../../common/user';
import { QuestionDto } from '../../dto/QuestionDto';
import { QuizDto } from '../../dto/QuizDto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public nombreCurso: string;
  public idTema : String;
  public questions: QuestionDto[];
  public editQuestion: QuestionDto;
  public currentNombre: string;
  public quiz: QuizDto;
  public user: User;
  public answers: AnswerDto[];
  public answer1: AnswerDto;
  public answer2: AnswerDto;
  public answer3: AnswerDto;
  public answer4: AnswerDto;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private temaService: TemaService,
    private _sanitizer: DomSanitizer,
    private quizService : QuizService,
    private questionService: QuestionService,
    private resultService: ResultService,
    private answerService: AnswerService) { }

  ngOnInit(): void {
    this.quiz = new QuizDto();
    this.editQuestion = new QuestionDto();
    this.answer1 = new AnswerDto();
    this.answer2 = new AnswerDto();
    this.answer3 = new AnswerDto();
    this.answer4 = new AnswerDto();
    this.answers = [];
    this.user = this.authenticationService.getUserFromLocalCache();
    this.route.queryParams.subscribe((params) => {
      this.nombreCurso = params.nombreCurso;
      this.idTema = params.idTema;
      this.getQuizActual(params.idQuiz);
    });
  }


  getQuizActual(idQuiz: string) {
    this.quizService.getByIdQuiz(idQuiz).subscribe((response: QuizDto) => {
      this.quiz = response;
      this.getQuestions(response.idQuiz.toString(), true);
    });
  }

  getQuestions(idQuiz: string, showNotification: boolean) {
    this.questionService.getAllQuestionByIdQuiz(idQuiz).subscribe(
      (response: QuestionDto[]) => {
        this.questions = response;
        let cont : number = 0;

        for(let question of response){
          cont++;
          if(cont===1) this.answer1.idQuestion = question.idQuestion;
          if(cont===2) this.answer2.idQuestion = question.idQuestion;
          if(cont===3) this.answer3.idQuestion = question.idQuestion;
          if(cont===4) this.answer4.idQuestion = question.idQuestion;
        }

        if (showNotification) {
          this.sendNotification(
            NotificationType.SUCCESS,
            `${response.length} preguntas cargadas exitosamente.`
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

  public saveNewQuestion(): void {
    this.clickButton('new-question-save');
  }

  public sendAnswers(): void{

    this.answers = [];

    console.log(this.questions);

    // console.log(this.questions);
    for(let question of this.questions){
      if(question.answerByUser!== undefined && question.idQuestion == this.answer1.idQuestion) this.answer1.ans = question.answerByUser;
      if(question.answerByUser!== undefined && question.idQuestion == this.answer2.idQuestion) this.answer2.ans = question.answerByUser;
      if(question.answerByUser!== undefined && question.idQuestion == this.answer3.idQuestion) this.answer3.ans = question.answerByUser;
      if(question.answerByUser!== undefined && question.idQuestion == this.answer4.idQuestion) this.answer4.ans = question.answerByUser;
    }

    let result : ResultDto = new ResultDto();
    result.idQuiz = this.quiz.idQuiz;
    result.idUser = this.user.id.toString();

    this.resultService.createNewResult(result).subscribe(
      (response: ResultDto) => {

        this.answer1.idResult = response.idResultado;
        this.answer2.idResult = response.idResultado;
        this.answer3.idResult = response.idResultado;
        this.answer4.idResult = response.idResultado;

        this.answers.push(this.answer1);
        this.answers.push(this.answer2);
        this.answers.push(this.answer3);
        this.answers.push(this.answer4);

        console.log(this.answers);

        this.answerService.registerAnswer(this.answers).subscribe(
          (response1: AnswerDto[]) => {

            this.resultService.gradeQuiz(response.idResultado).subscribe(
              (response2: ResultDto) => {

                console.log(response2);

                this.sendNotification(
                  NotificationType.INFO,
                  `Respuestas enviadas correctamente. Revisar resultado en Historial de Notas.`
                );

                this.onRegresar();

              },
              (errorResponse: HttpErrorResponse) => {
                this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
              }
            );

          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          }
        );


      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    );
  }

  public onUpdateQuestion(): void {
    this.questionService.updateQuestion(this.editQuestion).subscribe(
      (response: QuestionDto) => {
        this.clickButton('closeEditQuestionModalButton');
        this.getQuizActual(this.quiz.idQuiz);
        this.sendNotification(NotificationType.SUCCESS, `Pregunta actualizado exitosamente`);
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    );
  }

  public onAddNewQuestion(questionDto: QuestionDto): void {
    questionDto.idQuiz = this.quiz.idQuiz.toString();
    this.questionService.register(questionDto).subscribe(
      (response: QuestionDto) => {
        this.clickButton('new-question-close');
        this.getQuizActual(this.quiz.idQuiz);
        this.sendNotification(NotificationType.SUCCESS, `Pregunta registrada exitosamente`);
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    );
  }

  public onRegresar(): void {
    this.router.navigate(['/quiz/management'], {
     queryParams: { nombreCurso: this.nombreCurso, idTema: this.idTema, idQuiz: this.quiz.idQuiz }
    });
  }

  public onEditQuestion(questionDto: QuestionDto): void {
    this.editQuestion = questionDto;
    this.clickButton('openQuestionEdit');
  }

  public onDeleteQuestion(idQuestion: bigint): void {
    if (
      confirm(
        '¿Está seguro de eliminar la pregunta?'
      )
    ) {
    this.questionService.deleteQuestion(idQuestion.toString()).subscribe(
      (response: CustomHttpResponse) => {
        this.sendNotification(NotificationType.SUCCESS, response.message);
        this.getQuizActual(this.quiz.idQuiz);
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
