import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Priority } from '../../models/priority';
import { Task } from '../../models/task';
import { TaskApiService } from '../../services/task-api.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {

  @Output() updation : boolean = false;
  @Output() deletion : boolean = false;
  taskId : string = '';
  task : Task = {
    id: '',
    title: '',
    description: '',
    folderId : '',
    realization : new Date(),
    creationDate: new Date(),
    priority : Priority.low
  };

  constructor(private taskService : TaskApiService, private routeService: ActivatedRoute, private router : Router) { }

  async ngOnInit() {
    this.taskId = this.routeService.snapshot.paramMap.get('id') as string;
    this.task = await this.taskService.getById(this.taskId) as Task;
  }

  async Sleep(time : number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  async OnDeleteClick() {
    this.deletion = true;
  }
  
  async OnDeletion(flag : boolean) {
    this.deletion = false;
    if(flag) {
      await this.Sleep(100);
      await this.taskService.Delete(this.task.id);
      this.router.navigate(["/folder", this.task.folderId]);
    }
  }

  async OnUpdateClick() {
    this.updation = true;
  }

  async OnUpdation(flag : boolean) {
    this.updation = false;
    if(flag) {
      await this.Sleep(100);
      this.router.navigate(["/folder", this.task.folderId]);
    }
  }

  async OnBack() {
    this.router.navigate(["/folder", this.task.folderId]);
  }
}
