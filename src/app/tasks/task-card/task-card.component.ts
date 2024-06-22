import { Component } from '@angular/core';
import { CommentComponent } from '../../comments/comment/comment.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  standalone: true, // This component is not standalone
  imports: [CommentComponent,CommonModule]
})
export class TaskCardComponent {
  showComments = false; // Initially hide the comments

  toggleComments() {
    this.showComments = !this.showComments; // Toggle the visibility
  }
}