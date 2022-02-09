import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-folder-sortby',
  templateUrl: './sortby.component.html',
  styleUrls: ['./sortby.component.scss']
})
export class SortbyComponent {

  result : string[] = [];
  @Output() sortBy : EventEmitter<string[]> = new EventEmitter<string[]>();

  OnChageSelection(event : any) : void {
    switch (event.value) {
      case '1': {
        this.result[0] = "Date";
        this.result[1] = "ASC";
        break;
      }
      case '2': {
        this.result[0] = "Date";
        this.result[1] = "DESC";
        break;
      }
      case '3': {
        this.result[0] = "Title";
        this.result[1] = "ASC";
        break;
      }
      case '4': {
        this.result[0] = "Title";
        this.result[1] = "DESC";
        break;
      }
      default: break;
    }
    this.sortBy.emit(this.result);
  }

}
