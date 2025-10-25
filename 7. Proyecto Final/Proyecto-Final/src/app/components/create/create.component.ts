import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
  public title: string = 'Crear proyecto';
  public project!: Project;
  public save_project: any;
  public status: string = '';
  public filesToUpload: Array<File> = [];
  public url: string = Global.url;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.project = {
      _id: '',
      name: '',
      description: '',
      category: '',
      year: new Date().getFullYear(),
      langs: '',
      image: ''
    } as unknown as Project;
  }

  onSubmit(form: NgForm): void {
    this._projectService.saveProject(this.project).subscribe({
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
              form.resetForm();
            }).catch(err => {
              console.error(err);
              this.status = 'failed';
            });
          } else {
            this.save_project = response.project;
            this.status = 'success';
            form.resetForm();
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