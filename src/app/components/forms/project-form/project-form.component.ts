// project-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
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
  url = 'https://trellobackendupdate.azurewebsites.net/api/project';
  formType: string = 'Project';

  @Input() currentId: number = 0;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  edit(id: number, data: any, formType: string) {
    // Implement the logic to edit a project with the given id
    console.log(`Editing project with id: ${id}`);
    // Example: Fetch the project details and populate the form
    this.apiService.update( id, data, formType).subscribe({
      next: (project) => {
        this.projectForm.patchValue(project);
        console.log('Project details fetched for editing:', project);
      },
      error: (error) => console.error('Error fetching project details:', error),
    });
  }

  delete(id: number, formType: string) {
    // Implement the logic to delete a project with the given id
    console.log(`Deleting project with id: ${id}`);
    // Example: Call the API to delete the project and handle the response
    this.apiService.delete(id, formType).subscribe({
      next: () => {
        console.log(`Project with id: ${id} deleted successfully.`);
        // Optionally, refresh the list of projects or navigate away
      },
      error: (error) => console.error('Error deleting project:', error),
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
