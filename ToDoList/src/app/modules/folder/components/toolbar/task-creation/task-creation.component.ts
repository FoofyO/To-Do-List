import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.scss']
})
export class TaskCreationComponent {

  @Output() showCreate : EventEmitter<void> = new EventEmitter<void>();

  OnClick() : void {
    this.showCreate.emit();
  }
}
