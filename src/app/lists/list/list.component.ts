import { Component, Input, OnDestroy, OnInit } from '@angular/core'; // Removed duplicate 'input'
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../../components/modal/modal.component';
import { ModalService } from '../../services/modal-service.service';
import { Subscription } from 'rxjs';
import { Task } from '../../models/task';
import { List } from '../../models/lists';
import { TaskCardComponent } from '../../tasks/task-card/task-card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ModalComponent, TaskCardComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() tasks: Task[] = [];
  @Input() lists: List[] = [];

  private modalSubscription: Subscription = new Subscription();

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalSubscription = this.modalService.watch().subscribe((status) => {
      // Handle modal status changes here if needed
    });

    console.log('Received lists:', this.lists);
  }
  // Example method in your list.component.ts
  get filteredLists() {
    return this.lists.map((list) => ({
      ...list,
      tasks: list.tasks,
    }));
  }
  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  toggleModal(action: string) {
    this.modalService.open(action);
  }

  toggleModalClose() {
    this.modalService.close();
  }

  // Additional methods interacting with the modal can be added here
}
