import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-folder-tool-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent {

  @Output() showCreate : EventEmitter<void> = new EventEmitter<void>();

  OnClick() : void {
    this.showCreate.emit();
  }

}
