import { HistorialNotasComponent } from './components/historial-notas/historial-notas.component';
import { QuestionComponent } from './components/question/question.component';
import { ExamComponent } from './components/exam/exam.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { AvanceComponent } from './components/avance/avance.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { CursoComponent } from './components/curso/curso.component';
import { TemaComponent } from './components/tema/tema.component';
import { RecursoComponent } from './components/recurso/recurso.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/management', component: UserComponent, canActivate: [AuthenticationGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'curso/management', component: CursoComponent, canActivate: [AuthenticationGuard]},
  { path: 'quiz/management', component: ExamComponent, canActivate: [AuthenticationGuard]},
  { path: 'avance/management', component: AvanceComponent, canActivate: [AuthenticationGuard]},
  { path: 'historialNota/management', component: HistorialNotasComponent, canActivate: [AuthenticationGuard]},
  { path: 'estadisticas/management', component: EstadisticasComponent, canActivate: [AuthenticationGuard]},
  { path: 'editProfile', component: EditProfileComponent, canActivate: [AuthenticationGuard] },
  { path: 'tema/management', component: TemaComponent, canActivate: [AuthenticationGuard] },
  { path: 'recurso/management', component: RecursoComponent, canActivate: [AuthenticationGuard] },
  { path: 'question/management', component: QuestionComponent, canActivate: [AuthenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
