import { Component, OnInit, Input } from '@angular/core';
import { CommentComponent } from '../../comments/comment/comment.component';
import { CommonModule } from '@angular/common';
import { Comments } from '../../models/comment';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  imports: [CommentComponent, CommonModule],
  standalone: true,
})
export class TaskCardComponent implements OnInit {
  @Input() taskId?: string | number = ''; // Adjust type as necessary and provide an initializer
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() comments: Comments[] = [];

  showCommentsFlag: boolean = false; // Input for comments
  showComments: boolean = false;
  // Placeholder for comments data

  constructor() {}

  ngOnInit(): void {}

  toggleComments() {
    console.log('Toggling comments');
    console.log('Comments:', this.comments);

    this.showComments = !this.showComments;
  }

  getComments() {}

  showCommentsList() {
    console.log('showcomments');
    this.showCommentsFlag = !this.showCommentsFlag;
    console.log('Comments:', this.comments);

    console.log('showcomments', this.showCommentsFlag);
  }

  // Base height of the card without comments (in pixels)
  baseCardHeight: number = 150; // Adjust based on your default card height

  // Additional height per comment (in pixels)
  additionalHeightPerComment: number = 40; // Adjust based on your needs

  getCardHeight(): string {
    if (this.showCommentsFlag) {
      // Calculate total height when comments are shown
      const totalHeight =
        this.baseCardHeight +
        this.comments.length * this.additionalHeightPerComment;
      return `${totalHeight}px`;
    } else {
      // Return base height when comments are not shown
      return `${this.baseCardHeight}px`;
    }
  }
}
