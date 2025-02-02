import { Component } from '@angular/core';
import { FormBuilderService } from '../../services/form-builder.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SvgIconComponent } from "../../shared/svg-icon/svg-icon.component";

@Component({
  selector: 'app-right-drawer',
  imports: [CommonModule, FormsModule],
  templateUrl: './right-drawer.component.html',
  styleUrl: './right-drawer.component.scss'
})
export class RightDrawerComponent {

  isOpen: boolean = false;
  editElement!: any;
  allTypes = ['single_line_text', 'multi_line_text', 'integer', 'date', 'time', 'date_time',
    'single_selection', 'multi_selection', 'dropdown', 'upload'];
  fieldList = [
    {
      label: 'Field Name',
      elements: this.allTypes,
      type: 'text',
      feild: 'label'
    },
    {
      label: 'Description',
      elements: this.allTypes,
      type: 'text',
      feild: 'description'
    },
    {
      label: 'Placeholder',
      elements: ['single_line_text', 'multi_line_text', 'integer'],
      type: 'text',
      feild: 'placeholder'
    },
    {
      label: 'Required',
      elements: this.allTypes,
      type: 'check',
      feild: 'required'
    },
  ];

  constructor(private service: FormBuilderService) { }

  ngOnInit(): void {
    this.service.modalState$.subscribe(state => {
      this.isOpen = state;
    });

    this.service.editElement$.subscribe((data) => {
      if (data) {
        this.editElement = data;
      }
    });
  }

  closeModal() {
    this.service.toggleModal(false, {});
  }

  saveFieldProperties() {
    this.closeModal();
    this.service.updateFieldProperty(this.editElement);
  }

}
