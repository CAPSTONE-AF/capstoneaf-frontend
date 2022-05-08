import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public user: User;
  constructor(private router: Router, private authenticationService: AuthenticationService,
    private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
  }

  async onLogOut(): Promise<void>  {
    this.authenticationService.logOut();
    window.location.reload();
    await this.delay(500);
    this.router.navigate(['/login']);
    this.sendNotification(NotificationType.SUCCESS, `Se ha desconectado con éxito.`);
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'Ocurrió un error. Inténtalo de nuevo.');
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
