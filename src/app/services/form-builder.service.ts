import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FieldGroup } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  defualtFiledGroup: FieldGroup[] = [
    {
      id: Date.now(),
      name: 'Defualt field group',
      description: 'Defualt Description',
      default: true
    }
  ]

  constructor() {
    this.loadFieldGroups();
  }

  private filedGroupList = new BehaviorSubject<FieldGroup[]>(this.defualtFiledGroup);
  filedGroupListData$ = this.filedGroupList.asObservable();

  private selectFiledGroup = new BehaviorSubject<FieldGroup | null>(this.defualtFiledGroup[0]);
  selectFiledGroup$ = this.selectFiledGroup.asObservable();


  loadFieldGroups() {
    const savedGroups = localStorage.getItem('fieldGroups');
    if (savedGroups) {
      this.setFiledGroupListData(JSON.parse(savedGroups));
    }
  }

  setFiledGroupListData(data: FieldGroup[]) {
    this.filedGroupList.next(data);
  }

  setSelectFiledGroup(data: FieldGroup) {
    this.selectFiledGroup.next(data);
  }

  deleteFieldGroup(id: number) {
    let currentList = this.filedGroupList.getValue();
    currentList = currentList.filter(group => group.id !== id);
    this.filedGroupList.next(currentList);
    this.setSelectFiledGroup(currentList[0])
  }

  updateFieldGroup(item: FieldGroup) {
    let currentList = this.filedGroupList.getValue();
    const index = currentList.findIndex((el) => el.id === item.id);
    currentList[index] = { ...item };
    this.filedGroupList.next(currentList);
  }
}
