import { Routes } from '@angular/router';

import { ProjectComponent } from './projects/project/project.component';
import { ListComponent } from './lists/list/list.component';
import { CommentComponent } from './comments/comment/comment.component';
import { HomeComponent } from './home/home/home.component';
import { ModalComponent } from './components/modal/modal.component';

export const routes: Routes = [
  { path: 'projects', component: ProjectComponent },
  { path: 'lists', component: ListComponent },
  { path: 'comments', component: CommentComponent },
  { path: 'home', component: HomeComponent },
  { path: 'modal', component: ModalComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `home-component`
  { path: '**', redirectTo: '/home' },

  // other routes...
];
