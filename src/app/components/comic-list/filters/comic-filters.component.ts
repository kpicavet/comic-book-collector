import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ComicState } from "../../../models/comic-book.model";

@Component({
  selector: "app-comic-filters",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-wrap items-end gap-3 mb-6">
      <!-- Search input -->
      <div class="flex-1 min-w-[200px]">
        <input
          id="search"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          [(ngModel)]="searchValue"
          (ngModelChange)="onSearchChange($event)"
          placeholder="zoek op titel of nummer..."
        />
      </div>

      <!-- State filter -->
      <div class="w-40">
        <label for="state" class="block text-sm font-medium text-gray-600 mb-1"
          >Status</label
        >
        <select
          id="state"
          [(ngModel)]="selectedState"
          (ngModelChange)="onStateChange($event)"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">alle</option>
          <option *ngFor="let state of states" [value]="state">
            {{ state }}
          </option>
        </select>
      </div>

      <!-- Owned filter -->
      <div class="w-40">
        <label for="owned" class="block text-sm font-medium text-gray-600 mb-1"
          >Collectie</label
        >
        <select
          id="owned"
          [(ngModel)]="selectedOwned"
          (ngModelChange)="onOwnedChange($event)"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">alle</option>
          <option value="true">in collectie</option>
          <option value="false">niet in collectie</option>
        </select>
      </div>

      <!-- Favorite filter -->
      <div class="w-40">
        <label
          for="favorite"
          class="block text-sm font-medium text-gray-600 mb-1"
          >Favorieten</label
        >
        <select
          id="favorite"
          [(ngModel)]="selectedFavorite"
          (ngModelChange)="onFavoriteChange($event)"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">alle</option>
          <option value="true">favorieten</option>
          <option value="false">geen favorieten</option>
        </select>
      </div>

      <!-- Action buttons -->
      <div class="flex gap-2 self-stretch pt-5">
        <button
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          (click)="addClick.emit()"
        >
          Nieuw
        </button>
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          (click)="uploadClick.emit()"
        >
          Upload
        </button>
      </div>
    </div>
  `,
})
export class ComicFiltersComponent {
  @Input() searchValue = "";
  @Input() selectedState = "";
  @Input() selectedOwned = "";
  @Input() selectedFavorite = "";
  @Output() searchChange = new EventEmitter<string>();
  @Output() stateChange = new EventEmitter<string>();
  @Output() ownedChange = new EventEmitter<string>();
  @Output() favoriteChange = new EventEmitter<string>();
  @Output() addClick = new EventEmitter<void>();
  @Output() uploadClick = new EventEmitter<void>();

  states = Object.values(ComicState);

  onSearchChange(value: string) {
    this.searchChange.emit(value);
  }

  onStateChange(value: string) {
    this.stateChange.emit(value);
  }

  onOwnedChange(value: string) {
    this.ownedChange.emit(value);
  }

  onFavoriteChange(value: string) {
    this.favoriteChange.emit(value);
  }
}
