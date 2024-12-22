import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComicBook, ComicState } from "../../../models/comic-book.model";
import { StateChipComponent } from "./state-chip.component";
import { ComicImageComponent } from "./comic-image.component";
import { UploadCoverButtonComponent } from "./upload-cover-button.component";

@Component({
  selector: "app-comic-card",
  standalone: true,
  imports: [
    CommonModule,
    StateChipComponent,
    ComicImageComponent,
    UploadCoverButtonComponent,
  ],
  template: `
    <div
      class="comic-card group relative w-full transform transition-all duration-300 hover:scale-105 hover:z-10 cursor-pointer"
      [ngClass]="getStateBorderClass()"
      (click)="toggleDetails()"
    >
      <app-comic-image
        [storageUrl]="comic.storage_url"
        [state]="comic.state || undefined"
        [owned]="comic.owned"
      ></app-comic-image>

      <!-- Not owned indicator -->
      <div
        *ngIf="!comic.owned"
        class="absolute top-8 left-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold transform -rotate-12 shadow-lg z-10"
      >
        Niet in collectie
      </div>

      <!-- Favorite button for non-owned comics -->
      <button
        *ngIf="!comic.owned"
        class="absolute top-8 right-2 z-20 transition-transform duration-200
               hover:scale-110 active:scale-95"
        (click)="toggleFavorite($event)"
        [title]="comic.favorite ? 'Remove from favorites' : 'Add to favorites'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          [class.text-yellow-400]="comic.favorite"
          [class.text-gray-400]="!comic.favorite"
          class="w-6 h-6 transition-colors drop-shadow-lg"
          [class.hover:text-yellow-400]="!comic.favorite"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="black"
          stroke-width="1"
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      </button>

      <!-- Content overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
        [class.opacity-100]="showDetails"
        [class.md:opacity-0]="true"
        [class.md:group-hover:opacity-100]="true"
        [class.transition-opacity]="true"
      >
        <div class="absolute bottom-0 left-0 right-0 p-4">
          <!-- Comic number badge -->
          <div class="flex items-center gap-2 mb-2">
            <div
              class="inline-flex items-center bg-yellow-400 text-black font-bold px-2 py-0.5 rounded-full text-sm"
            >
              #{{ comic.number }}
            </div>
            <app-upload-cover-button
              [comicNumber]="comic.number"
              (coverUpdated)="onCoverUpdated()"
            ></app-upload-cover-button>
          </div>

          <!-- Title -->
          <h3
            class="text-lg font-bold text-white drop-shadow-lg mb-3 line-clamp-2"
          >
            {{ comic.title }}
          </h3>

          <!-- State selector -->
          <app-state-chip
            [value]="comic.state || undefined"
            [owned]="comic.owned"
            (valueChange)="onStateChange($event)"
            (ownedChange)="onOwnedChange($event)"
          ></app-state-chip>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .comic-card {
        border-radius: 8px;
        aspect-ratio: 1/1.4142;
        border: 2px solid transparent;
        overflow: hidden;
      }

      :host {
        .state-border-nieuw {
          border-color: #064e3b;
        }
        .state-border-goed {
          border-color: #16a34a;
        }
        .state-border-ok {
          border-color: #84cc16;
        }
        .state-border-oud {
          border-color: #f97316;
        }
        .state-border-versleten {
          border-color: #dc2626;
        }
      }
    `,
  ],
})
export class ComicCardComponent {
  @Input() comic!: ComicBook;
  @Output() stateChange = new EventEmitter<{
    id: string;
    state: ComicState | null;
  }>();
  @Output() ownedChange = new EventEmitter<{ id: string; owned: boolean }>();
  @Output() favoriteChange = new EventEmitter<{
    id: string;
    favorite: boolean;
  }>();

  showDetails = false;

  toggleDetails() {
    if (window.innerWidth < 768) {
      this.showDetails = !this.showDetails;
    }
  }

  toggleFavorite(event: Event) {
    event.stopPropagation();
    this.favoriteChange.emit({
      id: this.comic.id,
      favorite: !this.comic.favorite,
    });
  }

  onStateChange(state: ComicState | null) {
    event?.stopPropagation();
    this.stateChange.emit({ id: this.comic.id, state });
  }

  onOwnedChange(owned: boolean) {
    event?.stopPropagation();
    this.ownedChange.emit({ id: this.comic.id, owned });
  }

  onCoverUpdated() {
    // Handle any necessary updates after cover upload
  }

  getStateBorderClass(): string {
    if (!this.comic.owned || !this.comic.state) return "";
    return `state-border-${this.comic.state}`;
  }
}
