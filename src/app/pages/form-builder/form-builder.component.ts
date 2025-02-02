import { Component } from '@angular/core';
import { RightPaneComponent } from '../../components/right-pane/right-pane.component';
import { LeftPaneComponent } from '../../components/left-pane/left-pane.component';
import { RightDrawerComponent } from '../../components/right-drawer/right-drawer.component';
import { MiddlePaneComponent } from '../../components/middle-pane/middle-pane.component';

@Component({
  selector: 'app-form-builder',
  imports: [
    LeftPaneComponent,
    RightPaneComponent,
    RightDrawerComponent,
    MiddlePaneComponent
  ],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss'
})
export class FormBuilderComponent {

}
