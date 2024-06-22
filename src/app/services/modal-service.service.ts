import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private display: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<'open' | 'close'>('close');

  watch() {
    return this.display.asObservable();
  }

  open() {
    console.log('Modal is opening');
    this.display.next('open');
  }

  close() {
    console.log('Modal is closing');
    this.display.next('close');
  }
}