import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { AuthGuard } from './_guards/auth.guard';
import { A1CoLubieRobicComponent } from './a1stories/a1-co-lubie-robic/a1-co-lubie-robic.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'a1-co-lubie-robic', component: A1CoLubieRobicComponent},
  {path: 'test', component: TestComponent},
  //{path: '',
    //runGuardsAndResolvers: 'always',
   // canActivate: [AuthGuard],
  //  children: [
    //  {path: 'members', component: MemberListComponent},
    //  {path: 'members/:username', component: MemberDetailComponent},
     // {path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
    //  {path: 'lists', component: ListsComponent},
     // {path: 'messages', component: MessagesComponent},
    ]
//},
  // ** is for an invalid route
 // {path: '**', component: HomeComponent, pathMatch: 'full'},
//];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
