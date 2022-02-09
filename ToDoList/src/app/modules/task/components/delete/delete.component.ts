import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/modules/account/services/token-storage.service';
import { TaskApiService } from '../../services/task-api.service';

@Component({
  selector: 'app-task-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  @Output() closeDelete : EventEmitter<boolean> = new EventEmitter<boolean>();

  async OnClick(flag : boolean = false) {
    let modal = document.getElementById('myModal') as HTMLElement;
    modal.style.animationName = 'animateClose';
    await this.Sleep(300);
    if(flag) this.closeDelete.emit(true);
    else this.closeDelete.emit(false);
  }

  async Sleep(time : number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  async OnSubmit() {
      this.OnClick(true);
  }

}
