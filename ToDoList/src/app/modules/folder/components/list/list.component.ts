import { Component, Input, OnInit, Output } from '@angular/core';
import { TokenStorageService } from 'src/app/modules/account/services/token-storage.service';
import { Folder } from '../../models/folder';
import { FolderApiService } from '../../services/folder-api.service';

@Component({
  selector: 'app-folder-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Output() view : boolean = false;
  @Output() creation : boolean = false;
  @Output() folders : Array<Folder> = [];

  constructor(private folderService : FolderApiService, private tokenStorage : TokenStorageService) {}

  async ngOnInit() {
    this.folders = await this.folderService.getByUserId(this.tokenStorage.userId) as Array<Folder>;
  }

  async OnChangeView() {
    this.view = !this.view;
  } 

  async OnCreateClick() {
    this.creation = true;
  } 

  async Sleep(time : number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  async OnCreation(flag : boolean) {
    this.creation = false;
    if(flag) {
      await this.Sleep(100);
      this.folders = await this.folderService.getByUserId(this.tokenStorage.userId) as Array<Folder>;
    }
  }

  async OnSortBy(result : string[]) {
    this.folders = await this.folderService.getByUserIdOrdered(this.tokenStorage.userId, result[0], result[1]) as Array<Folder>;
  }
}
