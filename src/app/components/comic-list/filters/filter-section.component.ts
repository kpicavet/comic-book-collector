import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComicFiltersComponent } from "./comic-filters.component";

@Component({
  selector: "app-filter-section",
  standalone: true,
  imports: [CommonModule, ComicFiltersComponent],
  template: `
    <div class="mb-6">
      <!-- Toggle button -->
      <button
        (click)="showFilters = !showFilters"
        class="w-full flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
      >
        <span class="font-medium text-gray-700">Filters</span>
        <svg
          class="w-5 h-5 text-gray-500 transition-transform duration-200"
          [class.rotate-180]="showFilters"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- Filter content -->
      <div *ngIf="showFilters" class="mt-2">
        <app-comic-filters
          [searchValue]="searchValue"
          [selectedState]="selectedState"
          [selectedOwned]="selectedOwned"
          [selectedFavorite]="selectedFavorite"
          (searchChange)="searchChange.emit($event)"
          (stateChange)="stateChange.emit($event)"
          (ownedChange)="ownedChange.emit($event)"
          (favoriteChange)="favoriteChange.emit($event)"
          (addClick)="addClick.emit()"
          (uploadClick)="uploadClick.emit()"
        ></app-comic-filters>
      </div>
    </div>
  `,
})
export class FilterSectionComponent {
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

  showFilters = false;
}
