import { Component } from '@angular/core';
import { TaskComponent } from '../../tasks/task/task.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

}
