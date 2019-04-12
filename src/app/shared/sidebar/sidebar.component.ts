import { Component, OnInit } from '@angular/core';
import { GradeService } from '../../services/grade.service';
import { IGrade } from '../../interfaces/IGrade';
import { AppService } from '../../services/app.service';
import { Router } from '../../../../node_modules/@angular/router';
import { Location } from '../../../../node_modules/@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [ GradeService ]
})
export class SidebarComponent implements OnInit {

  public materias: IGrade[] = [];
  public status: boolean = true;
  public itemsLoaded: boolean = false;  
  private _anima: any;
  
  constructor(
    private _gradeService: GradeService,
    public _appService: AppService, 
    private _router: Router    
  ) { }

  ngOnInit() {  
    // if(this._router.url == '/') return;
    
    this._gradeService.listarGrade()
        .then(data => {
          this.itemsLoaded = true;
          this.materias = data;
        })
        .catch(() => this._router.navigate(['/login']))

    $(".openMenu, .link-father, .link-child").click(() => {
      $( ".openMenu" ).toggleClass('change');
      $('.sidebar').toggleClass('openSidebar');
      // $('body').toggleClass('scrollblock');
    });
  }

  sair() {
    this._appService.token = '';
    this._router.navigate(['login']);
  }

}
