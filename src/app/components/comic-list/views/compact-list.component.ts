import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComicBook, ComicState } from "../../../models/comic-book.model";
import { ComicDetailPanelComponent } from "./comic-detail-panel.component";

@Component({
  selector: "app-compact-list",
  standalone: true,
  imports: [CommonModule, ComicDetailPanelComponent],
  template: `
    <div class="space-y-1">
      <div *ngFor="let comic of comics" class="relative group">
        <!-- Main row -->
        <div
          class="flex items-center gap-2 p-2 rounded-lg transition-all border-2"
          [class.bg-red-200]="!comic.owned"
          [class.border-red-600]="!comic.owned"
          [class.border-transparent]="comic.owned"
          [ngClass]="getStateClass(comic)"
        >
          <!-- Number -->
          <div
            class="min-w-[2rem] text-center font-medium"
            [class.text-gray-600]="comic.owned"
            [class.text-gray-400]="!comic.owned"
            [class.opacity-60]="!comic.owned"
          >
            {{ comic.number }}
          </div>

          <!-- Title -->
          <div
            class="flex-grow font-medium truncate"
            [class.text-gray-900]="comic.owned"
            [class.text-gray-500]="!comic.owned"
            [class.opacity-60]="!comic.owned"
          >
            {{ comic.title }}
          </div>

          <!-- Action buttons -->
          <div class="flex items-center gap-1 shrink-0">
            <!-- Favorite button -->
            <button
              *ngIf="!comic.owned"
              class="transition-transform duration-200 hover:scale-110 active:scale-95"
              (click)="onFavoriteClick($event, comic)"
              title="Toggle favorite"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                [class.text-yellow-400]="comic.favorite"
                [class.text-gray-400]="!comic.favorite"
                class="w-5 h-5 transition-colors drop-shadow-lg"
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

            <!-- Detail toggle button -->
            <button
              class="p-1 rounded-full hover:bg-black/5 transition-colors"
              (click)="toggleDetails(comic)"
              title="Show details"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 transition-transform"
                [class.rotate-180]="isDetailOpen(comic)"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Detail panel -->
        <div *ngIf="isDetailOpen(comic)" class="mt-1">
          <app-comic-detail-panel
            [comic]="comic"
            (stateChange)="onStateChange($event, comic)"
            (ownedChange)="onOwnedChange($event, comic)"
          ></app-comic-detail-panel>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .bg-state-nieuw {
        @apply bg-emerald-100;
      }
      .bg-state-goed {
        @apply bg-green-100;
      }
      .bg-state-ok {
        @apply bg-yellow-100;
      }
      .bg-state-oud {
        @apply bg-orange-100;
      }
      .bg-state-versleten {
        @apply bg-red-100;
      }
    `,
  ],
})
export class CompactListComponent {
  @Input() comics: ComicBook[] = [];
  @Output() stateChange = new EventEmitter<{
    id: string;
    state: ComicState | null;
  }>();
  @Output() ownedChange = new EventEmitter<{ id: string; owned: boolean }>();
  @Output() favoriteChange = new EventEmitter<{
    id: string;
    favorite: boolean;
  }>();

  private openDetails = new Set<string>();

  getStateClass(comic: ComicBook): string {
    if (!comic.owned) return "";
    return comic.state ? `bg-state-${comic.state}` : "";
  }

  toggleDetails(comic: ComicBook) {
    if (this.openDetails.has(comic.id)) {
      this.openDetails.delete(comic.id);
    } else {
      this.openDetails.add(comic.id);
    }
  }

  isDetailOpen(comic: ComicBook): boolean {
    return this.openDetails.has(comic.id);
  }

  onStateChange(state: ComicState | null, comic: ComicBook) {
    this.stateChange.emit({ id: comic.id, state });
  }

  onOwnedChange(owned: boolean, comic: ComicBook) {
    this.ownedChange.emit({ id: comic.id, owned });
  }

  onFavoriteClick(event: Event, comic: ComicBook) {
    event.stopPropagation();
    this.favoriteChange.emit({ id: comic.id, favorite: !comic.favorite });
  }
}
