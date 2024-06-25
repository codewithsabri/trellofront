import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { ModalService } from '../../services/modal-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/service-api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
})
export class ModalComponent implements OnInit {
  isOpen = false;
  formGroup1: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  formGroup4: FormGroup;
  public modalTitle: string = '';
  requireNonEmpty(control: FormControl): { [key: string]: any } | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'requireNonEmpty': true };
  }


  constructor(
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private http: HttpClient
  ) {
    this.formGroup1 = new FormGroup({
      title: new FormControl('', [Validators.required, this.requireNonEmpty]),
      description: new FormControl('', [Validators.required, this.requireNonEmpty]),
    });
    this.formGroup2 = new FormGroup({
      title: new FormControl('', [Validators.required, this.requireNonEmpty]),
      description: new FormControl('', [Validators.required, this.requireNonEmpty]),
    });
    this.formGroup3 = new FormGroup({
      title: new FormControl('', [Validators.required, this.requireNonEmpty]),
      description: new FormControl('', [Validators.required, this.requireNonEmpty]),
    });
    this.formGroup4 = new FormGroup({
      title: new FormControl('', [Validators.required, this.requireNonEmpty]),
      description: new FormControl('', [Validators.required, this.requireNonEmpty]),
    });

  }


  ngOnInit() {
    this.modalService.watch().subscribe((status) => {
      this.isOpen = status === 'open';
    });

    const fullPath = this.router.url;
    console.log('Current path:', fullPath);


  
  }

  // existing code

getLabelForControl(controlName: string): string {
  // logic to get label for control
  const control = this.formGroup1.get(controlName);
  if (control) {
    const label = controlName === 'title' ? 'Title' : 'Description';
    return label;
  }
  return '';

}

  closeModal() {
    this.modalService.close();
  }

  saveFormData() {

  }

  open(action: string) {
    console.log(`Opening modal for action: ${action}`);
    // Additional logic here to handle the action
  }

  onSubmit() {
    if (this.formGroup1.valid) {
      this.saveFormData();
      this.closeModal();
    } else {
      // Iterate over the form controls and mark them as touched to trigger the display of error messages
      Object.keys(this.formGroup1.controls).forEach(field => {
        const control = this.formGroup1.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      console.error('Form is not valid. Please fill in all required fields.');
    }
  }
}