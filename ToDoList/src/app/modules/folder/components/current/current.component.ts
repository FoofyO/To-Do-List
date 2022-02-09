import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/modules/account/services/token-storage.service';
import { Task } from 'src/app/modules/task/models/task';
import { TaskApiService } from 'src/app/modules/task/services/task-api.service';
import { Folder } from '../../models/folder';
import { FolderApiService } from '../../services/folder-api.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {

  @Output() tasks : Task[] = [];
  @Output() view : boolean = false;
  @Output() folderId : string = "";
  @Output() creation : boolean = false;
  @Output() updation : boolean = false;
  @Output() deletion : boolean = false;
  @Output() folder : Folder = {
    id: '',
    title: '',
    userId: '',
    date: new Date(),
    tasks: []
  };

  constructor(private folderService : FolderApiService, 
              private tokenStorage : TokenStorageService, 
              private routeService: ActivatedRoute,
              private taskService : TaskApiService,
              private router : Router) { }

  async ngOnInit() {
    this.folderId = this.routeService.snapshot.paramMap.get('id') as string;
    this.folder = await this.folderService.getById(this.folderId) as Folder;
    this.tasks = await this.taskService.getByFolderId(this.folderId) as Array<Task>
  }

  async OnChangeView() {
    this.view = !this.view;
  } 

  async Sleep(time : number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  async OnBack() {
    this.router.navigate(["/folder"]);
  }

  async OnDeleteClick() {
    this.deletion = true;
  }
  
  async OnDeletion(flag : boolean) {
    this.deletion = false;
    if(flag) {
      await this.Sleep(100);
      await this.folderService.Delete(this.folder.id);
      this.router.navigate(["/folder/list"]);
    }
  }

  async OnUpdateClick() {
    this.updation = true;
  }

  async OnUpdation(flag : boolean) {
    this.updation = false;
    if(flag) {
      await this.Sleep(100);
      this.router.navigate(["/folder/list"]);
    }
  }

  async OnCreateClick() {
    this.creation = true;
  }

  async OnCreation(flag : boolean) {
    this.creation = false;
    if(flag) {
      await this.Sleep(100);
      this.tasks = await this.taskService.getByFolderId(this.folderId) as Array<Task>
    }
  }
}
