import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  public nombre: string = '';
  public followers: number = 0;

  constructor(private _route: ActivatedRoute, private _router: Router) {}

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.nombre = params['nombre'];
      const f = params['followers'];
      this.followers = f ? +f : 0;
    });
  }

  redirigir(): void {
    this._router.navigate(['/zapatillas']);
  }
}
