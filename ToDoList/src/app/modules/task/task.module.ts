import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskRoutingModule } from './task-routing.module';
import { CurrentComponent } from './components/current/current.component';
import { UpdationComponent } from './components/toolbar/updation/updation.component';
import { DeletionComponent } from './components/toolbar/deletion/deletion.component';
import { ItemComponent } from './components/item/item.component';
import { DeleteComponent } from './components/delete/delete.component';
import { UpdateComponent } from './components/update/update.component';
import { DatetimePipe } from 'src/app/core/pipes/datetime.pipe';
import { DatePipe } from 'src/app/core/pipes/date.pipe';


@NgModule({
  declarations: [
    CurrentComponent,
    UpdationComponent,
    DeletionComponent,
    ItemComponent,
    DeleteComponent,
    UpdateComponent,
    DatetimePipe,
    DatePipe
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TaskModule { }
