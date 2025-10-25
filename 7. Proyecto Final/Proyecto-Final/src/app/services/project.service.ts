import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { Global } from './global';

@Injectable()
export class ProjectService{
  public url: string = Global.url;

  constructor(private _http: HttpClient){}

  saveProject(project: Project): Observable<any>{
    const params = JSON.stringify(project);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+'save-project', params, {headers});
  }

  getProjects(): Observable<any>{
    return this._http.get(this.url+'projects');
  }

  getProject(id: string): Observable<any>{
    return this._http.get(this.url+'project/'+id);
  }

  deleteProject(id: string): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url+'project/'+id, {headers});
  }

  updateProject(project: Project): Observable<any>{
    const params = JSON.stringify(project);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url+'project/'+project._id, params, {headers});
  }
}
