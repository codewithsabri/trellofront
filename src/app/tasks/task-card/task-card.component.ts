import { Component, Input } from '@angular/core';
import { Comments } from '../../models/comment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class TaskCardComponent {
  @Input() taskId?: string | number = ''; // Adjust type as necessary and provide an initializer
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() comments: Comments[] = [];
  @Input() Listid: number = 0;

  isVisible: boolean = false; // Input for comments
  showComments: boolean = false;
  // Placeholder for comments data

  constructor() {}

  ngOnInit() {
    console.log('test')
    console.log(this.Listid)
  }

  toggleComments() {
    console.log('Toggling comments');
    console.log('Comments:', this.comments);

    this.showComments = !this.showComments;
  }

  showCommentsList() {
    console.log('showcomments');
    this.isVisible = !this.isVisible;
    console.log('Comments:', this.comments);

    console.log('showcomments', this.isVisible);
  }

  // Base height of the card without comments (in pixels)
  baseCardHeight: number = 150; // Adjust based on your default card height

  // Additional height per comment (in pixels)
  additionalHeightPerComment: number = 40; // Adjust based on your needs

  getCardHeight(): string {
    if (this.isVisible) {
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
