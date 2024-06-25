import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observer } from 'rxjs';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  standalone: true,
  imports: [HttpClientModule, TaskCardComponent],
})
export class TaskComponent {
  constructor(private router: Router, private http: HttpClient) {}

  goToAddTask() {
    this.router.navigate(['/add-task']);
  }

  sendData(formData: any) {
    console.log(formData);
    this.http.post('http://localhost:5128/api/tasks', formData).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error),
    } as Observer<any>);
  }
}
