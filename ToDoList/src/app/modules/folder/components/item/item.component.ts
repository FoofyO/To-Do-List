import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { Folder } from '../../models/folder';

@Component({
  selector: 'app-folder-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() viewBox : boolean = false;
  @Output() always : boolean = true;
  @Input() folder : Folder = {
    id: '',
    title: '',
    userId: '',
    date: new Date(),
    tasks: []
  };

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  OnClick() : void {
    this.router.navigate([`/folder/${this.folder.id}`]);
  }

}
