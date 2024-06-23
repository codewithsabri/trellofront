import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../../components/modal/modal.component';
import { ModalService } from '../../services/modal-service.service';
import { Subscription } from 'rxjs';
import { TaskComponent } from '../../tasks/task/task.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ModalComponent,TaskComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() title: string = ''; 
  private modalSubscription: Subscription = new Subscription();

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalSubscription = this.modalService.watch().subscribe(status => {
      // Handle modal status changes here if needed
    });
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