import { Component, OnInit } from '@angular/core';
import { FormBuilderService } from '../../services/form-builder.service';
import { FieldGroup } from '../../models';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SvgIconComponent } from "../../shared/svg-icon/svg-icon.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-middle-pane',
  imports: [FormsModule, SvgIconComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './middle-pane.component.html',
  styleUrl: './middle-pane.component.scss'
})
export class MiddlePaneComponent implements OnInit {
  editStatus: boolean = false;
  selectedFieldGroup!: FieldGroup;
  editForm!: FormGroup;

  constructor(private service: FormBuilderService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.service.selectFiledGroup$.subscribe((data) => {
      if (data) {
        this.selectedFieldGroup = data;
        this.editForm = this.fb.group({
          name: [this.selectedFieldGroup.name, Validators.required],
          description: [this.selectedFieldGroup.description],
        });
      }
    });
  }

  saveFieldGroup() {
    const values = this.editForm.value;
    this.selectedFieldGroup.name = values.name;
    this.selectedFieldGroup.description = values.description;
    this.editStatus = false;
    this.service.updateFieldGroup(this.selectedFieldGroup)
  }

  deleteFieldGroup() {
    this.service.deleteFieldGroup(this.selectedFieldGroup.id);
  }

}
