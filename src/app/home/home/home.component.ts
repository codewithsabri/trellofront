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
import { Comments } from '../../models/comment';
import { Task } from '../../models/task';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProjectComponent, ListComponent, ModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  selectedProject: number = 1;
  isModalOpen = false;
  projects: Project[] = [];
  // Placeholder variables for other models
  lists: List[] = []; // Assuming you might have a service to fetch lists
  comments: Comments[] = []; // Assuming you might have a service to fetch comments
  tasks: Task[] = []; // Assuming you might have a service to fetch tasks
  filteredLists?: List[] = [];

  private modalSubscription: Subscription = new Subscription();

  constructor(
    private modalService: ModalService,
    private getProjectsService: GetProjectsService
  ) {}

  ngOnInit() {
    this.getProjectsService.getProjects().subscribe((projects: Project[]) => {
      this.onProjectSelected(1);
      this.projects = projects;

      console.log('projects', projects);

      // Extract lists from projects
      this.lists = projects.flatMap((project) => project.lists);
      // Map lists to tasks
      this.tasks = this.lists.flatMap((list) => list.tasks);
      // Map tasks to comments
      this.comments = this.tasks.flatMap((task) => task.comments);
    });
    // Initialize other variables here if necessary
    this.modalSubscription = this.modalService.watch().subscribe((status) => {
      this.isModalOpen = status === 'open';
    });
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
    console.log('destruction');
  }

  onProjectSelected(projectId: number) {
    this.selectedProject = projectId; // Update the selectedProject variable

    const selectedProject = this.projects.find(
      (project) => project.id === projectId
    );

    // Filter the lists array based on the projectId
    this.filteredLists = selectedProject?.lists;
  }

  toggleModal(action: string) {
    if (action === 'open') {
      this.modalService.open(action);
    } else {
      this.modalService.close();
    }
  }

  toggleModalClose() {
    this.modalService.close();
  }
}
