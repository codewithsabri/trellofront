import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private display: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<'open' | 'close'>('close');
  private action: BehaviorSubject<string> = new BehaviorSubject<string>('');

  watch() {
    return this.display.asObservable();
  }

  watchAction() {
    return this.action.asObservable();
  }

  open(action: string) {
    console.log(`Opening modal for action: ${action}`);
    this.action.next(action); // Update action state
    this.display.next('open');
  }

  close() {
    console.log('Modal is closing');
    this.display.next('close');
  }
}