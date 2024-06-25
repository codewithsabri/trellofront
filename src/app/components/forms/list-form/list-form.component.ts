// list-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class ListFormComponent implements OnInit {
  listForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.listForm = this.fb.group({
      listName: ['', Validators.required]
    });
  }

  submit() {
    if (this.listForm.valid) {
      console.log(this.listForm.value);
      // Handle form submission
    }
  }
}
