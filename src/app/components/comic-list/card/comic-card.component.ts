import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicBook, ComicState } from '../../../models/comic-book.model';
import { StateSelectComponent } from './state-select.component';
import { ComicImageComponent } from './comic-image.component';
import { UploadCoverButtonComponent } from './upload-cover-button.component';

@Component({
  selector: 'app-comic-card',
  standalone: true,
  imports: [CommonModule, StateSelectComponent, ComicImageComponent, UploadCoverButtonComponent],
  template: `
    <div 
      class="comic-card group relative w-full transform transition-all duration-300 hover:scale-105 hover:z-10 cursor-pointer"
      [ngClass]="getStateBorderClass()"
      (click)="toggleDetails()"
    >
      <app-comic-image
        [coverUrl]="comic.cover_url"
        [storageUrl]="comic.storage_url"
        [state]="comic.state"
      ></app-comic-image>
      
      <!-- Not in collection indicator -->
      <div 
        *ngIf="comic.state === 'niet in bezit'"
        class="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold transform -rotate-12 shadow-lg z-10"
      >
        Niet in collectie
      </div>
      
      <!-- Content overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
           [class.opacity-100]="showDetails"
           [class.md:opacity-0]="true"
           [class.md:group-hover:opacity-100]="true"
           [class.transition-opacity]="true">
        <div class="absolute bottom-0 left-0 right-0 p-4">
          <!-- Comic number badge -->
          <div class="flex items-center gap-2 mb-2">
            <div class="inline-flex items-center bg-yellow-400 text-black font-bold px-2 py-0.5 rounded-full text-sm">
              #{{comic.number}}
            </div>
            <app-upload-cover-button
              [comicNumber]="comic.number"
              (coverUpdated)="onCoverUpdated()"
            ></app-upload-cover-button>
          </div>
          
          <!-- Title -->
          <h3 class="text-lg font-bold text-white drop-shadow-lg mb-2 line-clamp-2">
            {{comic.title}}
          </h3>
          
          <!-- State selector -->
          <app-state-select
            [value]="comic.state"
            (valueChange)="onStateChange($event)"
          ></app-state-select>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .comic-card {
      border-radius: 4px;
      aspect-ratio: 1/1.4142;
      border: 2px solid transparent;
    }

    :host {
      .state-border-perfect { border-color: #064e3b; }
      .state-border-good { border-color: #16a34a; }
      .state-border-ok { border-color: #84cc16; }
      .state-border-old { border-color: #f97316; }
    }
  `]
})
export class ComicCardComponent {
  @Input() comic!: ComicBook;
  @Output() stateChange = new EventEmitter<{id: string, state: ComicState}>();

  showDetails = false;

  toggleDetails() {
    if (window.innerWidth < 768) {
      this.showDetails = !this.showDetails;
    }
  }

  onStateChange(state: ComicState) {
    event?.stopPropagation();
    this.stateChange.emit({ id: this.comic.id, state });
  }

  onCoverUpdated() {
    // Handle any necessary updates after cover upload
  }

  getStateBorderClass(): string {
    if (this.comic.state === ComicState.notOwned || this.comic.state === ComicState.veryOld) return '';
    return `state-border-${this.comic.state.replace(' ', '-')}`;
  }
}