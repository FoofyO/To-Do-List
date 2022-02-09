import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-folder-deletion',
  templateUrl: './deletion.component.html',
  styleUrls: ['./deletion.component.scss']
})
export class DeletionComponent {

  @Output() showDelete : EventEmitter<void> = new EventEmitter<void>();

  OnClick() : void {
    this.showDelete.emit();
  }

}
