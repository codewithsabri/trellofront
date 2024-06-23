import { Component } from '@angular/core';
import { RouterOutlet, provideRouter } from '@angular/router';
import { TaskComponent } from './tasks/task/task.component';
import { TaskCardComponent } from './tasks/task-card/task-card.component';
import { HeaderComponent } from './navigation/header/header.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { routes } from './app.routes';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { provideHttpClient } from '@angular/common/http';// Import HttpClientModule

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    TaskComponent,
    TaskCardComponent,
    HeaderComponent,
    FooterComponent,
    HttpClientModule, // Add HttpClientModule here
  ],
})
export class AppComponent {
  title = 'Trello';
}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient(),],
});

