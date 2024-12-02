import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PomodoroComponent } from './components/pomodoro/pomodoro.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: PomodoroComponent },
  { path: 'pomodoro', component: PomodoroComponent },
  {
    path: '**',  // Wildcard route for handling unknown routes
    component: PageNotFoundComponent // Or any other fallback component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
