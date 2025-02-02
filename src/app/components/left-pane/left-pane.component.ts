import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
} from '@angular/forms';
import { FieldGroup } from '../../models';
import { FormBuilderService } from '../../services/form-builder.service';
import { SvgIconComponent } from "../../shared/svg-icon/svg-icon.component";


@Component({
  selector: 'app-left-pane',
  imports: [CommonModule, FormsModule, SvgIconComponent],
  templateUrl: './left-pane.component.html',
  styleUrl: './left-pane.component.scss',
})
export class LeftPaneComponent implements OnInit {
  fieldGroups: FieldGroup[] = [];
  newGroupName: string = '';
  newGroupDescription: string = '';
  constructor(private service: FormBuilderService) {
  }


  ngOnInit(): void {
    this.service.filedGroupListData$.subscribe((data) => {
      if (data) {
        this.fieldGroups = data;
        localStorage.setItem('fieldGroups', JSON.stringify(this.fieldGroups));
      }
    })
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
    this.service.setFiledGroupListData(this.fieldGroups);
  }

  selectFieldGroup(item: FieldGroup) {
    this.service.setSelectFiledGroup(item);
  }
}
