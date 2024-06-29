// project-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/service-api.service';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup = new FormGroup({});
  formType: string = 'Project';

  @Input() currentId: number = 0;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  edit(id: number, formType: string) {
    console.log(`Editing project with id: ${id}`);
    // Create a payload with the form values and add the id as a key
    const payload = {
      ...this.projectForm.value,
      id: id // Add the id to the payload
    };
  
    this.apiService.update(id, payload, formType).subscribe({
      next: (project) => {
        this.projectForm.patchValue(project);
        console.log('Project details fetched for editing:', project);
        this.apiService.projectCreated();
      },
      error: (error) => console.error('Error fetching project details:', error),
    });
  }


  submit() {
    if (this.projectForm.valid) {
      this.apiService.post(this.projectForm.value, 'project').subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.apiService.projectCreated(); // Publish the event
        },
        error: (error) => console.error('Error:', error),
      });
    }
  }
}
