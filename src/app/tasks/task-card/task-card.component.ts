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

  fakeComments = [
    { id: 1, text: "This is a fake comment." },
    { id: 2, text: "Another fake comment." },
    { id: 2, text: "Another fake comment." },
    { id: 2, text: "Another fake comment." },
    { id: 2, text: "Another fake comment." },
    { id: 2, text: "Another fake comment." },
    { id: 2, text: "Another fake comment." }
    

  ];
  showCommentsFlag = false;
  
  showCommentsList() {
    this.showCommentsFlag = !this.showCommentsFlag;
  }

  // Assuming you have a comments array in your component
   // Your comments array

// Base height of the card without comments (in pixels)
baseCardHeight: number = 150; // Adjust based on your default card height

// Additional height per comment (in pixels)
additionalHeightPerComment: number = 40; // Adjust based on your needs

getCardHeight(): string {
  if (this.showCommentsFlag) {
    // Calculate total height when comments are shown
    const totalHeight = this.baseCardHeight + (this.fakeComments.length * this.additionalHeightPerComment);
    return `${totalHeight}px`;
  } else {
    // Return base height when comments are not shown
    return `${this.baseCardHeight}px`;
  }
}
}