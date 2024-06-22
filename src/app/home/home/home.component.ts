import { Component } from '@angular/core';
import { ProjectComponent } from '../../projects/project/project.component';
import { ListComponent } from '../../lists/list/list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProjectComponent,ListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
