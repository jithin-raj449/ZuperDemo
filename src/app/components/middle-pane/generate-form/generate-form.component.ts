import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SvgIconComponent } from '../../../shared/svg-icon/svg-icon.component';
import { CommonModule } from '@angular/common';
import { FormBuilderService } from '../../../services/form-builder.service';
import { FieldGroup } from '../../../models';

@Component({
  selector: 'app-generate-form',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SvgIconComponent],
  templateUrl: './generate-form.component.html',
  styleUrl: './generate-form.component.scss'
})
export class GenerateFormComponent implements OnInit {
  formFields: any[] = [];
  fieldGroup!: FieldGroup;
  constructor(private service: FormBuilderService) {
  }

  ngOnInit(): void {
    this.service.selectFiledGroup$.subscribe((data) => {
      if (data) {
        this.fieldGroup = data;
        this.formFields = [];
        if (this.fieldGroup.elemntsList) {
          this.formFields = this.fieldGroup.elemntsList;
        }
      }
    })
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    let data = event.dataTransfer?.getData('application/json');
    if (data) {
      let parsedData = JSON.parse(data);
      const newData = { ...parsedData, order: this.formFields.length, id: Date.now() };
      this.formFields.push(newData);
      this.updateFormFields();
    }
  }

  updateFormFields() {
    this.fieldGroup.elemntsList = this.formFields;
    this.service.updateFieldGroupList(this.fieldGroup);
  }


  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  removeField(id: any) {
    const index = this.formFields.findIndex((el) => el.id === id);
    this.formFields.splice(index, 1);
    this.updateFormFields();
  }

  openDrawer(id: any) {
    const item = this.formFields.find((el) => el.id === id);
    this.service.toggleModal(true, item);
  }

}
