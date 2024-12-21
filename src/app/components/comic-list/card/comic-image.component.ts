import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ComicState } from '../../../models/comic-book.model';
import { getComicImageUrl } from '../../../services/image.utils';

@Component({
  selector: 'app-comic-image',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="absolute inset-0 bg-cover bg-center transition-all duration-300"
      [style.background-image]="backgroundImage"
      [style.opacity]="state === comicState.notOwned ? '0.5' : '1'"
      [style.filter]="state === comicState.veryOld ? 'grayscale(100%)' : 'none'"
    ></div>
  `
})
export class ComicImageComponent {
  @Input() coverUrl?: string;
  @Input() storageUrl?: string;
  @Input() state!: ComicState;

  comicState = ComicState;

  constructor(private sanitizer: DomSanitizer) {}

  get backgroundImage() {
    return getComicImageUrl(this.storageUrl, this.coverUrl, this.sanitizer);
  }
}