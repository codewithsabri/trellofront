// project-form.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/service-api.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  submit() {
    if (this.projectForm.valid) {
      this.apiService
        .post(`${environment.apiUrl}/projects`, this.projectForm.value)
        .subscribe({
          next: (response) => {
            console.log('Success:', response);
            this.apiService.projectCreated(); // Publish the event
          },
          error: (error) => console.error('Error:', error),
        });
    }
  }

}
