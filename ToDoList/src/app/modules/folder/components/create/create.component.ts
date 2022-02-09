import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/modules/account/services/token-storage.service';
import { FolderApiService } from '../../services/folder-api.service';

@Component({
  selector: 'app-folder-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  createForm: FormGroup;
  @Output() closeCreate : EventEmitter<boolean> = new EventEmitter<boolean>();

  get title() { return this.createForm.get('title'); }

  constructor(private folderService: FolderApiService, private router: Router, private tokenStorage : TokenStorageService) {
    this.createForm = new FormGroup({
      title: new FormControl(null, [Validators.pattern('^[^\s^\x00-\x1f\\?*:"";<>|\/.][^\x00-\x1f\\?*:"";<>|\/]*[^\s^\x00-\x1f\\?*:"";<>|\/.]+$'), Validators.required])
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
      await this.folderService.Create(this.createForm.value);
      this.OnClick(true);
  }

}
