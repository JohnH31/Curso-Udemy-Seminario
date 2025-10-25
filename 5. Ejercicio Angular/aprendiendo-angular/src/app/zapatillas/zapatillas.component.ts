import { Component, OnInit } from '@angular/core';
import { Zapatilla } from '../models/zapatilla';

@Component({
  selector: 'zapatillas',
  templateUrl: './zapatillas.component.html'
})
export class ZapatillasComponent implements OnInit {
  public titulo: string = 'Zapatillas';
  public zapatillas: Array<Zapatilla> = [];
  public marcas: string[] = [];
  public color: string = 'red';
  public mi_marca: string = '';

  constructor() {}
  ngOnInit(): void {}

  getMarca(): string {
    return 'Mi marca es: ' + this.mi_marca;
  }

  addMarca(): void {
    if (this.mi_marca && !this.marcas.includes(this.mi_marca)) {
      this.marcas.push(this.mi_marca);
      this.mi_marca = '';
    }
  }

  borrarMarca(index: number): void {
    this.marcas.splice(index, 1);
  }

  onBlur(): void {
    console.log('Has salido del input');
  }

  mostrarPalabra(): void {
    alert(this.mi_marca);
  }
}
