import { AvanceDto } from 'src/app/dto/avanceDto';
import { TemaService } from 'src/app/service/tema.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AvanceService } from './../../service/avance.service';
import { Avance } from './../../common/avance';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import { DatePipe } from '@angular/common';
import { Tema } from 'src/app/common/tema';

@Component({
  selector: 'app-avance',
  templateUrl: './avance.component.html',
  styleUrls: ['./avance.component.css'],
})
export class AvanceComponent implements OnInit {
  public avances: Avance[];
  public user: User;

  constructor(
    private avanceService: AvanceService,
    private temaService: TemaService,
    private router: Router,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.avances = [];
    this.user = this.authenticationService.getUserFromLocalCache();
    this.getAvances(true);
  }

  public getAvances(showNotification: boolean): void {
    this.avanceService
      .getAllAvancesByUserId(this.user.id)
      .subscribe((response: AvanceDto[]) => {
        for (let responseTemp of response) {
          this.temaService
            .getTemaById(responseTemp.idTema.toString())
            .subscribe((resp: Tema) => {
              this.avances.push(new Avance(responseTemp.idAvance, this.user, resp, responseTemp.fechaCreacion));
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
