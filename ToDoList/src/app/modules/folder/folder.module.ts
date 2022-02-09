import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FolderRoutingModule } from './folder-routing.module';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/item/item.component';
import { ParserPipe } from 'src/app/core/pipes/parser.pipe';
import { GridlistComponent } from './components/toolbar/gridlist/gridlist.component';
import { CreateComponent } from './components/create/create.component';
import { CreationComponent } from './components/toolbar/creation/creation.component';
import { SortbyComponent } from './components/toolbar/sortby/sortby.component';
import { CurrentComponent } from './components/current/current.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { DeletionComponent } from './components/toolbar/deletion/deletion.component';
import { DeleteComponent } from './components/delete/delete.component';
import { UpdateComponent } from './components/update/update.component';
import { UpdationComponent } from './components/toolbar/updation/updation.component';
import { TaskCreationComponent } from './components/toolbar/task-creation/task-creation.component';
import { TaskCreateComponent } from '../task/components/create/create.component';


@NgModule({
  declarations: [
    ListComponent,
    ItemComponent,
    ParserPipe,
    GridlistComponent,
    CreateComponent,
    CreationComponent,
    SortbyComponent,
    CurrentComponent,
    DeletionComponent,
    TaskItemComponent,
    DeleteComponent,
    UpdateComponent,
    UpdationComponent,
    TaskCreationComponent,
    TaskCreateComponent
  ],
  imports: [
    CommonModule,
    FolderRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FolderModule { }
