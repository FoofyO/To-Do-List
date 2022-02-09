import { Component, Input, OnInit } from '@angular/core';
import { Priority } from '../../models/priority';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input() task : Task = {
    id: '',
    title: '',
    description: '',
    realization: new Date(),
    creationDate: new Date(),
    folderId : '',
    priority : Priority.low
  };
}
