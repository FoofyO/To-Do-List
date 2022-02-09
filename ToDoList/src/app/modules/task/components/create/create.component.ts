import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/modules/account/services/token-storage.service';
import { TaskApiService } from '../../services/task-api.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class TaskCreateComponent {

  createForm: FormGroup;
  @Input() folderId : string = "";
  @Output() closeCreate : EventEmitter<boolean> = new EventEmitter<boolean>();

  get title() { return this.createForm.get('title'); }
  get description() { return this.createForm.get('description'); }
  get realization() { return this.createForm.get('realization')}
  get priority() { return this.createForm.get('priority'); }

  constructor(private taskService: TaskApiService, private router: Router, private tokenStorage : TokenStorageService) {
    this.createForm = new FormGroup({
      title: new FormControl(null, [Validators.pattern('^[^\s^\x00-\x1f\\?*:"";<>|\/.][^\x00-\x1f\\?*:"";<>|\/]*[^\s^\x00-\x1f\\?*:"";<>|\/.]+$'), Validators.required]),
      description: new FormControl(null, [Validators.required]),
      realization: new FormControl(null, [Validators.required]),
      priority: new FormControl(null, [Validators.required]),
    })
  }

  async OnClick(flag : boolean = false) {
    let modal = document.getElementById('myModal') as HTMLElement;
    modal.style.animationName = 'animateClose';
    await this.Sleep(300);
    if(flag) this.closeCreate.emit(true);
    else this.closeCreate.emit(false);
  }

  async Sleep(time : number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  async OnSubmit() {
      this.createForm.value['userId'] = this.tokenStorage.userId;
      this.createForm.value['folderId'] = this.folderId;
      await this.taskService.Create(this.createForm.value);
      this.OnClick(true);
  }
}
