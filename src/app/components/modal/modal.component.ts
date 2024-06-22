import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators ,ReactiveFormsModule} from '@angular/forms';
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
      input1: new FormControl('', Validators.required),
      input2: new FormControl('', Validators.required),
      input3: new FormControl('', Validators.required),
      input4: new FormControl('', Validators.required),
    });
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

  onSubmit() {
    if (this.form.valid) {
      this.saveFormData();
      this.closeModal();
    }
  }
}