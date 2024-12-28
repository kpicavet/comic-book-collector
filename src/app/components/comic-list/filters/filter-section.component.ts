import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComicFiltersComponent } from "./comic-filters.component";

@Component({
  selector: "app-filter-section",
  standalone: true,
  imports: [CommonModule, ComicFiltersComponent],
  template: `
    <div class="mb-6">
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
}
