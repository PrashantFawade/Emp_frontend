import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AppWalkthroughComponent } from './app-walkthrough/app-walkthrough.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  {path:'home' , component:HomepageComponent},
  {path: 'login' , component:LoginComponent},
  {path: 'App-walkthrough' , component:AppWalkthroughComponent},
  {path: 'statistics' , component:StatisticsComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
