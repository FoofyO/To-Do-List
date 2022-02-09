import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth-guard.guard';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { CurrentComponent } from './components/current/current.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'list', component: ListComponent, canActivate: [AuthGuard]},
  {path: ':id', component: CurrentComponent, canActivate: [AuthGuard]},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FolderRoutingModule { }
