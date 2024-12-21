import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadModalService {
  private showModalSubject = new BehaviorSubject<{ show: boolean; comicNumber?: number }>({ show: false });
  showModal$ = this.showModalSubject.asObservable();

  openModal(comicNumber?: number) {
    this.showModalSubject.next({ show: true, comicNumber });
  }

  closeModal() {
    this.showModalSubject.next({ show: false });
  }
}