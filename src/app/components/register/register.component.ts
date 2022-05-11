import { Grado } from './../../common/grado';
import { GradoService } from './../../service/grado.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../service/authentication.service';
import { NotificationService } from '../../service/notification.service';
import { User } from '../../common/user';
import { NotificationType } from '../../enum/notification-type.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public showLoading: boolean;
  public subscriptions: Subscription[] = [];
  public grados:Grado [];
  public idGradoSeleccionado: bigint;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private notificationService: NotificationService, private gradoService: GradoService) {}

  ngOnInit(): void {
    this.grados = [];
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/user/management');
    }
    this.getGrados(true);
  }

  public getGrados(showNotification: boolean): void {
    this.gradoService.getAllGrados().subscribe(
      (response: Grado[]) => {
        this.grados = response;
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    );
  }


  public onRegister(user: User): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.register(user).subscribe(
        (response: User) => {
          this.showLoading = false;
          this.sendNotification(NotificationType.SUCCESS, `Se creó exitosamente una nueva cuenta para ${response.firstName}.`);
          this.router.navigateByUrl('/login');
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'Ha ocurrido un error. Intente de nuevo');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
