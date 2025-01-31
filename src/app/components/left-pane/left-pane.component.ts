import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

interface FieldGroup {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-left-pane',
  imports: [CommonModule, FormsModule],
  templateUrl: './left-pane.component.html',
  styleUrl: './left-pane.component.scss',
})
export class LeftPaneComponent {
  fieldGroups: FieldGroup[] = [
    {
      id: 1,
      name: 'Defualt field group',
      description: '',
    },
  ];
  newGroupName: string = '';
  newGroupDescription: string = '';
  constructor(private fb: FormBuilder) {
    this.loadFieldGroups();
  }

  loadFieldGroups() {
    const savedGroups = localStorage.getItem('fieldGroups');
    if (savedGroups) {
      this.fieldGroups = JSON.parse(savedGroups);
    }
  }

  saveFieldGroups() {
    // localStorage.setItem('fieldGroups', JSON.stringify(this.fieldGroups));
  }

  addFieldGroup() {
    const groupCount = this.fieldGroups.length;
    const newGroupName = `Form Group ${groupCount}`;

    const newGroup: FieldGroup = {
      id: Date.now(),
      name: newGroupName,
      description: '',
    };

    this.fieldGroups.push(newGroup);
    this.saveFieldGroups();
  }

  deleteFieldGroup(id: number) {
    this.fieldGroups = this.fieldGroups.filter((group) => group.id !== id);
    this.saveFieldGroups();
  }
}
