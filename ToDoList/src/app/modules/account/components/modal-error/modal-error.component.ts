import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-account-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent {
  
  @Input() errorDescription: string = '';
  @Output() closeModal : EventEmitter<boolean> = new EventEmitter<boolean>();

  async OnClick() {
    let modal = document.getElementById('myModal') as HTMLElement;
    modal.style.animationName = 'animateClose';
    await this.Sleep(300);
    this.closeModal.emit(false);
  }

  Sleep(time : number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}
