import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/modules/account/services/token-storage.service';
import { Priority } from '../../models/priority';
import { Task } from '../../models/task';
import { TaskApiService } from '../../services/task-api.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  updateForm: FormGroup;
  @Output() closeUpdate : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() task : Task = {
    id: '',
    title: '',
    description: '',
    realization: new Date(),
    creationDate: new Date(),
    folderId : '',
    priority : Priority.low
  };

  get title() { return this.updateForm.get('title'); }
  get description() { return this.updateForm.get('description'); }
  get realization() { return this.updateForm.get('realization')}
  get priority() { return this.updateForm.get('priority'); }

  constructor(private taskService: TaskApiService, private router: Router, private tokenStorage : TokenStorageService) {
    this.updateForm = new FormGroup({
      title: new FormControl(null, [Validators.pattern('^[^\s^\x00-\x1f\\?*:"";<>|\/.][^\x00-\x1f\\?*:"";<>|\/]*[^\s^\x00-\x1f\\?*:"";<>|\/.]+$'), Validators.required]),
      description: new FormControl(null, [Validators.required]),
      realization: new FormControl(null, [Validators.required]),
      priority: new FormControl(null, [Validators.required]),
    })
  }

  async ngOnInit(): Promise<void> {
    this.title?.setValue(this.task.title);
    this.description?.setValue(this.task.description);
    this.realization?.setValue(await this.transform(this.task.realization));
    this.priority?.setValue(this.task.priority);
  }

  async OnClick(flag : boolean = false) {
    let modal = document.getElementById('myModal') as HTMLElement;
    modal.style.animationName = 'animateClose';
    await this.Sleep(300);
    if(flag) this.closeUpdate.emit(true);
    else this.closeUpdate.emit(false);
  }

  async Sleep(time : number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  async OnSubmit() {
    this.updateForm.value['id'] = this.task.id;
    this.updateForm.value['folderId'] = this.task.folderId;
    this.updateForm.value['creationDate'] = this.task.creationDate;
    await this.taskService.Update(this.updateForm.value['id'],this.updateForm.value);
    this.OnClick(true);
  }

  async transform(value: Date): Promise<string> {
    let datetime = value.toString();
    let tmp : string = datetime.split('T')[0];
    return tmp;
  }

}
