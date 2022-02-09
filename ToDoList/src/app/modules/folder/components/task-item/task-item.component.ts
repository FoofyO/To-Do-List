import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Priority } from 'src/app/modules/task/models/priority';
import { Task } from 'src/app/modules/task/models/task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() viewBox : boolean = false;
  @Input() task : Task = {
    id: '',
    title: '',
    description: '',
    folderId : '',
    realization : new Date(),
    creationDate: new Date(),
    priority : Priority.low
  };

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  OnClick() : void {
    this.router.navigate([`/task/${this.task.id}`]);
  }

}
