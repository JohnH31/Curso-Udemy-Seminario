import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public url: string = Global.url;
  public project!: Project;
  public confirm: boolean = false;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      const id = params['id'];
      this.getProject(id);
    });
  }

  getProject(id: string): void {
    this._projectService.getProject(id).subscribe({
      next: (response: any) => {
        this.project = response.project as Project;
      },
      error: (error: any) => console.error(error)
    });
  }

  setConfirm(confirm: boolean): void {
    this.confirm = confirm;
  }

  deleteProject(id: string): void {
    this._projectService.deleteProject(id).subscribe({
      next: (response: any) => {
        if (response.project) {
          this._router.navigate(['/proyectos']);
        }
      },
      error: (error: any) => console.error(error)
    });
  }
}