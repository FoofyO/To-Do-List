import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/modules/account/services/token-storage.service';
import { Folder } from '../../models/folder';
import { FolderApiService } from '../../services/folder-api.service';

@Component({
  selector: 'app-folder-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  updateForm: FormGroup;
  @Output() closeUpdate : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() folder : Folder = {
    id: '',
    title: '',
    userId: '',
    date: new Date(),
    tasks: []
  };

  get title() { return this.updateForm.get('title'); }

  constructor(private folderService: FolderApiService, private router: Router, private tokenStorage : TokenStorageService) {
    this.updateForm = new FormGroup({
      title: new FormControl(null, [Validators.pattern('^[^\s^\x00-\x1f\\?*:"";<>|\/.][^\x00-\x1f\\?*:"";<>|\/]*[^\s^\x00-\x1f\\?*:"";<>|\/.]+$'), Validators.required])
    })
  }
  ngOnInit(): void {
    this.title?.setValue(this.folder.title);
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
    this.updateForm.value['id'] = this.folder.id;
    this.updateForm.value['userId'] = this.folder.userId;
    this.updateForm.value['date'] = this.folder.date;
    await this.folderService.Update(this.updateForm.value['id'],this.updateForm.value);
    this.OnClick(true);
  }

}
