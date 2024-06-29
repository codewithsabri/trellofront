import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { ModalService } from '../../services/modal-service.service';
import { Subscription } from 'rxjs';
import { ProjectComponent } from '../../projects/project/project.component';
import { ListComponent } from '../../lists/list/list.component';
import { GetProjectsService } from '../../services/get-projects.service';
import { Project } from '../../models/project';
import { List } from '../../models/lists';
import { ApiService } from '../../services/service-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProjectComponent, ListComponent, ModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  selectedProject: number = 0;
  isModalOpen = false;
  projects: Project[] = [];
  filteredLists?: List[] = [];
  private modalSubscription: Subscription = new Subscription();

  constructor(
    private modalService: ModalService,
    private getProjectsService: GetProjectsService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.fetchProjects();
    this.modalSubscription = this.modalService.watch().subscribe((status) => {
      this.isModalOpen = status === 'open';
    });
    this.subscribeToProjectChanges();
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  private fetchProjects() {
    this.getProjectsService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
      if (this.selectedProject) {
        this.onProjectSelected(this.selectedProject);
      }
    });
  }

  private subscribeToProjectChanges() {
    this.apiService.projectCreated$.subscribe(this.fetchProjects.bind(this));
    this.apiService.listCreated$.subscribe(this.fetchProjects.bind(this));
    this.apiService.taskCreated$.subscribe(this.fetchProjects.bind(this));
    this.apiService.commentCreated$.subscribe(this.fetchProjects.bind(this));
    
  }

  onProjectSelected(projectId: number) {
    this.selectedProject = projectId;
    const selectedProject = this.projects.find((project) => project.id === projectId);
    this.filteredLists = selectedProject?.lists;
  }

  toggleModal(action: string, projectId: number): void {
    this.modalService.open(action, projectId);
  }

  toggleModalClose() {
    this.modalService.close();
  }

  onProjectDeleted(deletedProjectId: number) {
    this.projects = this.projects.filter((project) => project.id !== deletedProjectId);
  }
}