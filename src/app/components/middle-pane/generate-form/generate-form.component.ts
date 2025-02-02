import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SvgIconComponent } from '../../../shared/svg-icon/svg-icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generate-form',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SvgIconComponent],
  templateUrl: './generate-form.component.html',
  styleUrl: './generate-form.component.scss'
})
export class GenerateFormComponent {
  formFields: any[] = [];

  onDrop(event: DragEvent) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('application/json');
    if (data) {
      this.formFields.push(JSON.parse(data));
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  removeField(index: any) {
    this.formFields.splice(index, 1);
  }

}
