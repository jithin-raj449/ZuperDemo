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
      category: 'TEXT', items: [
        { type: 'Single Line Text', description: 'Single text area', icon: 'alphabet' },
        { type: 'Multi Line Text', description: 'Multi text area', icon: 'multiline' },
        { type: 'Integer', description: 'Integer type area', icon: 'number' }
      ]
    },
    {
      category: 'DATE', items: [
        { type: 'Date', description: 'Select date from datepicker.', icon: 'calender' },
        { type: 'Time', description: 'Select time from timepicker.', icon: 'time' },
        { type: 'Date & Time', description: 'Select date & time from picker.', icon: 'date_and_time' }
      ]
    },
    {
      category: 'MULTI', items: [
        { type: 'Single Selection', description: 'Select single option.', icon: 'selection' },
        { type: 'Multi Selection', description: 'Select multiple options.', icon: 'check_circle' },
        { type: 'Dropdown', description: 'Select options from dropdown.', icon: 'list' }
      ]
    },
    {
      category: 'MEDIA', items: [
        { type: 'Upload', description: 'Upload documents/media files.', icon: 'upload' }
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
