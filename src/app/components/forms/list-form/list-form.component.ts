import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/service-api.service';
import { StoreService } from '../../../services/store.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class ListFormComponent implements OnInit {
  listForm: FormGroup = new FormGroup({});
  formType: string = 'List';
  @Input() data: any = {};
  @Input() currentId: number = 0;
  @Input() projectId: number = 0;

  // Removed @Input() projectId: number = 0; as we will use StoreService for state management

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService,
    private store: StoreService // Use StoreService for state management
  ) {}

  ngOnInit(): void {
    this.listForm = this.fb.group({
      title: ['', Validators.required],
    });

    console.log(this.currentId)

    // Subscribe to projectId changes from the store
    this.store.projectId$.subscribe(projectId => {
      if (projectId !== null) {
        // Perform actions when projectId changes, if needed
      }
    });
  }

  edit(id: number, formType: string) {
    // Use projectId from the store
    this.store.projectId$.pipe(take(1)).subscribe((projectId) => {
      if (projectId !== null) {
        const payload = {
          ...this.listForm.value,
          id: id,
          projectId: projectId,
          tasks: [] // Assuming tasks need to be initialized here
        };
    // Emit event for list creation
        // Call the API service with the payload
        this.apiService.update(id, payload, formType).subscribe({
          next: (project) => {
            this.apiService.listCreated(); 
          },
          error: (error) => console.error('Error updating project details:', error),
        });
      }
    });

  
  }

  submit() {
    console.log("submit ok")
    if (this.listForm.valid) {
      // Use projectId from the store
      this.store.projectId$.pipe(take(1)).subscribe((projectId) => {
        if (projectId !== null) {
          const payload = {
            ...this.listForm.value,
            projectId: projectId,
            tasks: [] // Assuming tasks need to be initialized here
          };

          // Call the API service with the payload
          this.apiService.post(payload, this.formType).subscribe({
            next: (response) => {
              // Handle success
              this.apiService.listCreated(); 
            },
            error: (error) => console.error('Error:', error),
          });
        }
      });
   
    }
    
  }
}