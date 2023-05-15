import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { AuthGuard } from './_guards/auth.guard';
import { A1CoLubieRobicComponent } from './a1stories/a1-co-lubie-robic/a1-co-lubie-robic.component';
import { TestComponent } from './test/test.component';
import { A1SpacerZPsemComponent } from './a1stories/a1-spacer-z-psem/a1-spacer-z-psem.component';
import { AdminGuard } from './_guards/admin.guard';
import { GetPremiumComponent } from './get-premium/get-premium.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'a1-co-lubie-robic', component: A1CoLubieRobicComponent},
  {path: 'test', component: TestComponent},
  {path: 'get-premium', component: GetPremiumComponent},
  {path: 'settings', component: SettingsComponent},
  {path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AdminGuard],
   children: [
      {path: 'a1-spacer-z-psem', component: A1SpacerZPsemComponent},
     //{path: 'members/:username', component: MemberDetailComponent},
     // {path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},

    ]
},
  // ** is for an invalid route
 {path: '**', component: HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
