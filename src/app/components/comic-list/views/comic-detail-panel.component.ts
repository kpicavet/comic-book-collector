import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComicBook, ComicState } from "../../../models/comic-book.model";
import { StateChipComponent } from "../card/state-chip.component";
import { ComicImageComponent } from "../card/comic-image.component";

@Component({
  selector: "app-comic-detail-panel",
  standalone: true,
  imports: [CommonModule, StateChipComponent, ComicImageComponent],
  template: `
    <div class="p-4 bg-white rounded-lg shadow-lg border border-gray-200">
      <div class="flex gap-4">
        <!-- Cover image -->
        <div
          class="relative w-24 aspect-[1/1.4142] rounded-lg overflow-hidden shadow-md"
        >
          <app-comic-image
            [storageUrl]="comic.storage_url"
            [state]="comic.state || undefined"
            [owned]="comic.owned"
          ></app-comic-image>
        </div>

        <!-- Controls -->
        <div class="flex-grow">
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
})
export class ComicDetailPanelComponent {
  @Input() comic!: ComicBook;
  @Output() stateChange = new EventEmitter<ComicState | null>();
  @Output() ownedChange = new EventEmitter<boolean>();

  onStateChange(state: ComicState | null) {
    this.stateChange.emit(state);
  }

  onOwnedChange(owned: boolean) {
    this.ownedChange.emit(owned);
  }
}
