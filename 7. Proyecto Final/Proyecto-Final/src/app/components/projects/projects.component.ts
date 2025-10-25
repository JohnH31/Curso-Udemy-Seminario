import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public projects: Project[] = [];
  public url: string = Global.url;

  constructor(private _projectService: ProjectService){}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this._projectService.getProjects().subscribe({
      next: (response: any) => {
        if (response.projects) {
          this.projects = response.projects as Project[];
        }
      },
      error: (error: any) => console.error(error)
    });
  }
}
