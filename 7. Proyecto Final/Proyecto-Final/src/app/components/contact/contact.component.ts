import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, AfterViewInit {
  public widthSlider: number = 0;
  public anchuraToSlider: number | false = false;
  public captions: boolean = false;
  public autor: { nombre?: string; website?: string } = {};

  @ViewChild('textos') textos!: ElementRef<HTMLDivElement>;

  constructor(){}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const el = this.textos?.nativeElement as HTMLDivElement | null;
    if (el) {
      const opcion_clasica = el.innerHTML;
    }
  }

  cargarSlider(): void {
    this.anchuraToSlider = this.widthSlider || 0;
  }

  resetearSlider(): void {
    this.anchuraToSlider = false;
  }

  getAutor(event: { nombre: string; website: string }): void {
    this.autor = event;
  }
}