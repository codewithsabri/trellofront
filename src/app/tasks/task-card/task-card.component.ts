import { Component, OnInit } from '@angular/core';
import { CommentComponent } from '../../comments/comment/comment.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/service-api.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  imports: [CommentComponent, CommonModule],
  standalone: true
})
export class TaskCardComponent implements OnInit {
  showComments = false;
  comments: any[] = []; // Placeholder for comments data

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getComments();
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  getComments() {
    // this.apiService.get('comments/url') // Assuming 'comments/url' is the endpoint
    //   .subscribe({
    //     next: (data) => this.comments = data,
    //     error: (error) => console.error('There was an error!', error)
    //   });
  }
}