import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadModalService } from '../../../services/upload-modal.service';

@Component({
  selector: 'app-upload-cover-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors"
      title="Upload new cover"
      (click)="onButtonClick($event)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </button>
  `
})
export class UploadCoverButtonComponent {
  @Input() comicNumber!: number;
  @Output() coverUpdated = new EventEmitter<void>();

  constructor(private uploadModalService: UploadModalService) {}

  onButtonClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.uploadModalService.openModal(this.comicNumber);
  }
}