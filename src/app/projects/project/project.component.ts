import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project';
import { Task } from '../../models/task';
import { Comments } from '../../models/comment';
import { List } from '../../models/lists';
import { ApiService } from '../../services/service-api.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() projects: Project[] = [];
  @Input() tasks: Task[] = [];
  @Input() comments: Comments[] = [];
  @Input() lists: List[] = [];
  @Output() projectClicked = new EventEmitter<number>();
  formType = 'Project';

  constructor(private apiService: ApiService) {}

  @Output() projectDeleted = new EventEmitter<number>();

  onProjectClick(project: Project) {
    this.projectClicked.emit(project.id);
  }

  delete(id: number, formType: string) {
    console.log(`Deleting project with id: ${id}`);
    this.apiService.delete(id, formType).subscribe({
      next: () => {
        console.log(`Project with id: ${id} deleted successfully.`);
        this.projectDeleted.emit(id);
      },
      error: (error) => console.error('Error deleting project:', error),
    });
  }
  ngOnInit() {
    console.log('Project component initialized');
  }
}
