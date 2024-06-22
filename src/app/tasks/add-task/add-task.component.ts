import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class AddTaskComponent implements OnInit {
  title: string = '';
  categorie: string = '';
  description: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('title:', this.title);
    console.log(`Categorie: ${this.categorie}`);
    console.log(`Description: ${this.description}`);
    this.sendData({
      title: this.title,
      category: this.categorie,
      description: this.description,
    });
  }

  sendData(formData: any) {
    console.log(formData);
    this.http.post('http://localhost:5128/api/tasks', formData).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error),
    });
  }
}
