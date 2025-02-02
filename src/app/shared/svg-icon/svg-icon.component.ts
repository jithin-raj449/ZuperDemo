import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  template: `
    <img 
      [src]="'./assets/icons/' + name + '.svg'" 
      [alt]="name" 
      width="24" 
      height="24" 
      (click)="onIconClick()"
      style="cursor: pointer;"
    >
  `,
  standalone: true
})
export class SvgIconComponent {
  @Input() name!: string;
  @Input() id?: number | string;
  @Output() iconClick = new EventEmitter<number | string>();

  onIconClick() {
    this.iconClick.emit(this.id);
  }
}