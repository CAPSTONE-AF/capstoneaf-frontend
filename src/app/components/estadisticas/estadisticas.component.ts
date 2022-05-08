import { CursoService } from './../../service/curso.service';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {


  private host = environment.apiUrl;
  public barChartImage: string;
  public pieChartImage: string;

  constructor(private userService: UserService, private cursoService: CursoService) { }

  ngOnInit(): void {
    this.getPieChartPopCursos();
    this.getBarChartNumUsuByGrado();
  }

  public getPieChartPopCursos(): void {
          this.pieChartImage =
            this.host +
            '/curso/exportar/piechart/pop_cursos/image';
  }

  public getBarChartNumUsuByGrado(): void {
    this.barChartImage =
      this.host +
      '/user/exportar/barchart/num_usu_grado/image';
}

public exportarBarChartNumUsuByGrado(): void {
  this.userService
    .exportarBarChartNumUsuByGrado()
    .subscribe((response) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'download.pdf';
      link.click();
    });
}

public exportarPieChartPopCursos(): void {
  this.cursoService
    .exportarPieChartPopCursos()
    .subscribe((response) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'download.pdf';
      link.click();
    });
}

}
