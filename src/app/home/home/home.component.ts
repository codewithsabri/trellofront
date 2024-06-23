import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { ModalService } from '../../services/modal-service.service';
import { Subscription } from 'rxjs';
import { ProjectComponent } from '../../projects/project/project.component';
import { ListComponent } from '../../lists/list/list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProjectComponent, ListComponent, ModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  isModalOpen = false;
  private modalSubscription: Subscription = new Subscription();

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalSubscription = this.modalService.watch().subscribe(status => {
      this.isModalOpen = status === 'open';
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
}