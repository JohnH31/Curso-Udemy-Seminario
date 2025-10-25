import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html'
})
export class SliderComponent implements OnInit {
  @Input() anchura: number = 0;
  @Input('etiquetas') captions: boolean = false;
  @Output() conseguirAutor = new EventEmitter<{nombre: string; website: string}>();

  public autor = { nombre: 'Jon', website: 'https://example.com' };

  constructor(){}

  ngOnInit(): void {}

  lanzar(event: Event): void {
    this.conseguirAutor.emit(this.autor);
  }
}
