import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetProjectsService } from '../../services/get-projects.service'; // Corrected service import

interface Project {
  id: number;
  title: string;
  description: string; // This will hold 'Completed' or 'Not Completed'
}

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projects: Project[] = []; // Changed type to Project[]

  constructor(private getProjectsService: GetProjectsService) {} // Corrected service name

  ngOnInit() {
    console.log('ngOnInit called');
    this.getProjectsService.getProjects().subscribe((projects: any) => {
      this.projects = projects as Project[];
      console.log('Data fetching completed', this.projects);
    });
  }
}