import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
  public title: string = 'Editar proyecto';
  public project!: Project;
  public save_project: any;
  public status: string = '';
  public filesToUpload: Array<File> = [];
  public url: string = Global.url;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
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

  onSubmit(form: NgForm): void {
    this._projectService.updateProject(this.project).subscribe({
      next: (response: any) => {
        if (response.project) {
          if (this.filesToUpload && this.filesToUpload.length) {
            this._uploadService.makeFileRequest(
              Global.url + 'upload-image/' + response.project._id,
              [],
              this.filesToUpload,
              'image'
            ).then((result: any) => {
              this.save_project = result.project;
              this.status = 'success';
            }).catch(err => {
              console.error(err);
              this.status = 'failed';
            });
          } else {
            this.save_project = response.project;
            this.status = 'success';
          }
        } else {
          this.status = 'failed';
        }
      },
      error: (error: any) => {
        console.error(error);
        this.status = 'failed';
      }
    });
  }

  fileChangeEvent(fileInput: Event): void {
    const target = fileInput.target as HTMLInputElement | null;
    this.filesToUpload = (target?.files ? Array.from(target.files) : []) as Array<File>;
  }
}