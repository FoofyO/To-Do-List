import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-folder-tool-gridlist',
  templateUrl: './gridlist.component.html',
  styleUrls: ['./gridlist.component.scss']
})
export class GridlistComponent {

  switch : boolean = false;
  @Output() changeView : EventEmitter<void> = new EventEmitter<void>();

  OnClick() : void {
    this.switch = !this.switch;
    this.changeView.emit();
  }
}
