import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

interface UsuarioForm {
  nombre: string;
  apellidos: string;
  email: string;
  mensaje: string;
}

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  public show_data: UsuarioForm | null = null;
  public usuario: UsuarioForm = { nombre: '', apellidos: '', email: '', mensaje: '' };

  constructor() {}
  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.show_data = { ...this.usuario };
      console.log('Contacto form value:', this.usuario);
    }
  }
}
