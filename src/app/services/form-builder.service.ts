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
      default: true,
      elemntsList: []
    }
  ]

  constructor() {
    this.loadFieldGroups();
  }

  private filedGroupList = new BehaviorSubject<FieldGroup[]>(this.defualtFiledGroup);
  filedGroupListData$ = this.filedGroupList.asObservable();

  private selectFiledGroup = new BehaviorSubject<FieldGroup | null>(this.defualtFiledGroup[0]);
  selectFiledGroup$ = this.selectFiledGroup.asObservable();

  private modalStateSubject = new BehaviorSubject<boolean>(false);
  modalState$ = this.modalStateSubject.asObservable();

  private editElement = new BehaviorSubject<Object>({});
  editElement$ = this.editElement.asObservable();


  loadFieldGroups() {
    const savedGroups = localStorage.getItem('fieldGroups');
    if (savedGroups) {
      this.setFiledGroupListData(JSON.parse(savedGroups));
      this.setSelectFiledGroup(JSON.parse(savedGroups)[0])
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

  updateFieldGroupList(item: FieldGroup) {
    let currentList = this.filedGroupList.getValue();
    const index = currentList.findIndex((el) => el.id === item.id);
    currentList[index] = { ...item };
    this.filedGroupList.next(currentList);
  }

  updateFieldProperty(item: any) {
    let currentFieldGroup = this.selectFiledGroup.getValue();
    if (currentFieldGroup && currentFieldGroup?.elemntsList?.length) {
      const index = currentFieldGroup.elemntsList.findIndex((el) => el.id === item.id);
      currentFieldGroup.elemntsList[index] = item;
      this.updateFieldGroupList(currentFieldGroup);
    }
  }

  duplicateFieldGroup(duplicate: FieldGroup) {
    let currentList = this.filedGroupList.getValue();
    currentList = [...currentList, duplicate];
    this.setFiledGroupListData(currentList);
  }

  toggleModal(state: boolean, item: Object) {
    this.modalStateSubject.next(state);

    if (Object.keys(item).length) {
      this.editElement.next(item);
    }

    if (state) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}
