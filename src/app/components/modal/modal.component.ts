import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
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
  form: FormGroup;
  public modalTitle: string = '';
  public currentPage: string = '';

  constructor(
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private http: HttpClient
  ) {
    this.form = new FormGroup({
      input1: new FormControl('', [Validators.required, this.requireNonEmpty]),
      input2: new FormControl('', [Validators.required, this.requireNonEmpty]),
      input3: new FormControl('', [Validators.required, this.requireNonEmpty]),
      input4: new FormControl('', [Validators.required, this.requireNonEmpty]),
    });
  }

  requireNonEmpty(control: FormControl): { [key: string]: any } | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': 'value is only whitespace' };
  }

  ngOnInit() {
    this.modalService.watch().subscribe((status) => {
      this.isOpen = status === 'open';
    });

    const fullPath = this.router.url;
    console.log('Current path:', fullPath);

    this.currentPage = fullPath.startsWith('/') ? fullPath.substring(1) : fullPath;
    this.modalTitle = this.currentPage;

    this.apiService.fetchDataForPage(this.currentPage).subscribe((data) => {
      console.log(data);
    });
  }

  closeModal() {
    this.modalService.close();
  }

  saveFormData() {
    const formData = {
      page: this.currentPage,
      data: this.form.value,
    };
    console.log('Saving form data for page:', formData.page, 'with data:', formData.data);
  }

  open(action: string) {
    console.log(`Opening modal for action: ${action}`);
    // Additional logic here to handle the action
  }

  onSubmit() {
    if (this.form.valid) {
      this.saveFormData();
      this.closeModal();
    } else {
      // Iterate over the form controls and mark them as touched to trigger the display of error messages
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      console.error('Form is not valid. Please fill in all required fields.');
    }
  }
}