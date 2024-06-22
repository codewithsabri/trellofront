import { Routes } from '@angular/router';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { TaskComponent } from './tasks/task/task.component';
import { ProjectComponent } from './projects/project/project.component';
import { ListComponent } from './lists/list/list.component';
import { CommentComponent } from './comments/comment/comment.component';
import { HomeComponent } from './home/home/home.component';
import { ModalComponent } from './components/modal/modal.component';

export const routes: Routes = [
  { path: 'add-task', component: AddTaskComponent },
  { path: 'task', component: TaskComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'lists', component: ListComponent },
  { path: 'tasks', component: TaskComponent },
  { path: 'comments', component: CommentComponent },
  { path: 'home', component: HomeComponent },
  {path: 'modal', component: ModalComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `home-component`
  { path: '**', redirectTo: '/home' },

  // other routes...
];
