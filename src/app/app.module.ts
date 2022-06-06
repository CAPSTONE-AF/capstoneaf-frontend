import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotificationModule } from './notification.module';
import { NotificationService } from './service/notification.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { CursoComponent } from './components/curso/curso.component';
import { TemaComponent } from './components/tema/tema.component';
import { RecursoComponent } from './components/recurso/recurso.component';
import { AvanceComponent } from './components/avance/avance.component';
import { DatePipe } from '@angular/common';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { ExamComponent } from './components/exam/exam.component';
import { QuestionComponent } from './components/question/question.component';
import { HistorialNotasComponent } from './components/historial-notas/historial-notas.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    SidebarComponent,
    EditProfileComponent,
    CursoComponent,
    TemaComponent,
    RecursoComponent,
    AvanceComponent,
    EstadisticasComponent,
    ExamComponent,
    QuestionComponent,
    HistorialNotasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NotificationModule
  ],
  providers: [NotificationService, AuthenticationGuard, AuthenticationService, DatePipe, UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
