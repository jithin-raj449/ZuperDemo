import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SvgIconComponent } from "../../shared/svg-icon/svg-icon.component";


interface FormElements {
  type: 'text' | 'date' | 'multi' | 'media';
  lable: string;
  list: [
    {
      type: string;
      label: string;
      subLabel: string;
    }
  ];
}

@Component({
  selector: 'app-right-pane',
  imports: [FormsModule, CommonModule, SvgIconComponent],
  templateUrl: './right-pane.component.html',
  styleUrl: './right-pane.component.scss'
})
export class RightPaneComponent {

  formElements = [
    {
      category: 'TEXT',
      items: [
        { label: 'Single Line Text', type: 'single_line_text', description: 'Single text area', icon: 'alphabet', fieldName: '', required: false, placeholder: '' },
        { label: 'Multi Line Text', type: 'multi_line_text', description: 'Multi text area', icon: 'multiline', fieldName: '', required: false, placeholder: '' },
        { label: 'Integer', type: 'integer', description: 'Integer type area', icon: 'number', fieldName: '', required: false, placeholder: '' }
      ]
    },
    {
      category: 'DATE',
      items: [
        { label: 'Date', type: 'date', description: 'Select date from datepicker.', icon: 'calender', fieldName: '', required: false, placeholder: '' },
        { label: 'Time', type: 'time', description: 'Select time from timepicker.', icon: 'time', fieldName: '', required: false, placeholder: '' },
        { label: 'Date & Time', type: 'date_time', description: 'Select date & time from picker.', icon: 'date_and_time', fieldName: '', required: false, placeholder: '' }
      ]
    },
    {
      category: 'MULTI',
      items: [
        { label: 'Single Selection', type: 'single_selection', description: 'Select single option.', icon: 'selection', fieldName: '', required: false, placeholder: '' },
        { label: 'Multi Selection', type: 'multi_selection', description: 'Select multiple options.', icon: 'check_circle', fieldName: '', required: false, placeholder: '' },
        { label: 'Dropdown', type: 'dropdown', description: 'Select options from dropdown.', icon: 'list', fieldName: '', required: false, placeholder: '' }
      ]
    },
    {
      category: 'MEDIA',
      items: [
        { label: 'Upload', type: 'upload', description: 'Upload documents/media files.', icon: 'upload', fieldName: '', required: false, placeholder: '' }
      ]
    }
  ];


  searchQuery = '';

  onDragStart(event: DragEvent, element: any) {
    event.dataTransfer?.setData('application/json', JSON.stringify(element));
  }

  filterElements() {
    return this.formElements.map(section => ({
      ...section,
      items: section.items.filter(item => item.type.toLowerCase().includes(this.searchQuery.toLowerCase()))
    })).filter(section => section.items.length > 0);
  }


}
