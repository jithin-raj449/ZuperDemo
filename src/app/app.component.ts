import { Component } from '@angular/core';
import { FormBuilderComponent } from './pages/form-builder/form-builder.component';

@Component({
  selector: 'app-root',
  imports: [FormBuilderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'zuper-demo';
}
