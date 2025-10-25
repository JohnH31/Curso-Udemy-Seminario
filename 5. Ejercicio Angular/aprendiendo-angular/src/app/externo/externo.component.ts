import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-externo',
  templateUrl: './externo.component.html',
  styleUrls: ['./externo.component.css'],
  providers: [PeticionesService]
})
export class ExternoComponent implements OnInit {
  public new_user: { name: string; job: string } = { name: '', job: '' };
  public usuario_guardado: any = null;
  public fecha: Date = new Date();
  public userId: number | string = '';
  public user: any = null;

  constructor(private _peticionesService: PeticionesService) {}
  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (!form.valid) return;
    const payload = { ...this.new_user };
    this._peticionesService.addUser(payload).subscribe({
      next: (response: any) => {
        this.usuario_guardado = response;
        console.log('Usuario guardado:', response);
      },
      error: (error: any) => console.error(error)
    });
  }

  cargaUsuario(): void {
    if (this.userId === '' || this.userId === null) return;
    this._peticionesService.getUser(this.userId).subscribe({
      next: (result: any) => {
        this.user = result && result.data ? result.data : result;
        console.log('Usuario cargado:', this.user);
      },
      error: (error: any) => console.error(error)
    });
  }

  cargarUsuario(userId: number | string): void {
    this.userId = userId;
    this.cargaUsuario();
  }
}
