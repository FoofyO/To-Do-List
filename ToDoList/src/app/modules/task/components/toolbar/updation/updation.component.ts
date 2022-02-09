import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-updation',
  templateUrl: './updation.component.html',
  styleUrls: ['./updation.component.scss']
})
export class UpdationComponent {

  @Output() showUpdate : EventEmitter<void> = new EventEmitter<void>();

  OnClick() : void {
    this.showUpdate.emit();
  }

}
