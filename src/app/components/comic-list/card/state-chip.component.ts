import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComicState } from "../../../models/comic-book.model";

@Component({
  selector: "app-state-chip",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-2">
      <!-- Ownership toggle -->
      <button
        id="ownedbutton"
        (click)="toggleOwned()"
        class="group relative w-full py-1.5 px-3 rounded-lg transition-all duration-200"
        [class.bg-emerald-500]="owned"
        [class.hover:bg-emerald-600]="owned"
        [class.bg-red-500]="!owned"
        [class.hover:bg-red-600]="!owned"
      >
        <span class="text-white font-medium">
          {{ owned ? "✓ In collectie" : "✗ Niet in collectie" }}
        </span>
      </button>

      <!-- State management -->
      <div *ngIf="owned" class="space-y-2">
        <!-- Current state display -->
        <button
          *ngIf="value && !showStates"
          (click)="showStates = true"
          class="w-full py-1 px-2 rounded transition-all duration-200 text-xs font-medium"
          [ngClass]="getStateClass(value)"
        >
          {{ value }}
          <span class="ml-1 opacity-60">▼</span>
        </button>

        <!-- State selection grid -->
        <div *ngIf="showStates" class="grid grid-cols-2 gap-1.5">
          <button
            *ngFor="let state of states"
            (click)="selectState(state)"
            class="relative py-1 px-2 rounded transition-all duration-200 text-xs font-medium"
            [class.ring-2]="value === state"
            [class.ring-offset-1]="value === state"
            [ngClass]="getStateClass(state)"
          >
            {{ state }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .state-nieuw {
        @apply bg-emerald-100 text-emerald-800 ring-emerald-500;
      }
      .state-goed {
        @apply bg-green-100 text-green-800 ring-green-500;
      }
      .state-ok {
        @apply bg-yellow-100 text-yellow-800 ring-yellow-500;
      }
      .state-oud {
        @apply bg-orange-100 text-orange-800 ring-orange-500;
      }
      .state-versleten {
        @apply bg-red-100 text-red-800 ring-red-500;
      }
    `,
  ],
})
export class StateChipComponent {
  @Input() value?: ComicState;
  @Input() owned = true;
  @Output() valueChange = new EventEmitter<ComicState | null>();
  @Output() ownedChange = new EventEmitter<boolean>();

  states = Object.values(ComicState);
  showStates = false;

  toggleOwned() {
    const newOwned = !this.owned;
    this.ownedChange.emit(newOwned);
    if (!newOwned) {
      this.valueChange.emit(null);
      this.showStates = false;
    } else {
      this.valueChange.emit(ComicState.new);
      this.showStates = true;
    }
  }

  selectState(state: ComicState) {
    this.valueChange.emit(state);
    this.showStates = false;
  }

  getStateClass(state: string): string {
    return `state-${state}`;
  }
}
