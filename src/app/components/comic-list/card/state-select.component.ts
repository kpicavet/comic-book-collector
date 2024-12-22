import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ComicState } from "../../../models/comic-book.model";

@Component({
  selector: "app-state-select",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex gap-2 items-center">
      <select
        *ngIf="owned"
        [ngModel]="value"
        (ngModelChange)="onStateChange($event)"
        class="flex-1 bg-white/90 backdrop-blur-sm text-gray-900 border border-white/30 rounded px-3 py-1.5
               hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option
          *ngFor="let state of states"
          [value]="state"
          [class]="getStateClass(state)"
        >
          {{ state }}
        </option>
      </select>

      <div class="flex items-center">
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            [checked]="owned"
            (change)="onOwnedChange($event)"
            class="sr-only peer"
          />
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                      peer-focus:ring-blue-300 rounded-full peer 
                      peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                      peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                      after:start-[2px] after:bg-white after:border-gray-300 after:border 
                      after:rounded-full after:h-5 after:w-5 after:transition-all 
                      peer-checked:bg-blue-600"
          ></div>
          <span class="ms-3 text-sm font-medium text-white">In collectie</span>
        </label>
      </div>
    </div>
  `,
  styles: [
    `
      select option {
        background-color: white;
        color: #1f2937;
        padding: 8px;
      }

      .state-nieuw {
        color: #064e3b;
        font-weight: 600;
      }
      .state-goed {
        color: #16a34a;
        font-weight: 600;
      }
      .state-ok {
        color: #84cc16;
        font-weight: 600;
      }
      .state-oud {
        color: #f97316;
        font-weight: 600;
      }
      .state-versleten {
        color: #dc2626;
        font-weight: 600;
      }
    `,
  ],
})
export class StateSelectComponent {
  @Input() value?: ComicState;
  @Input() owned = true;
  @Output() valueChange = new EventEmitter<ComicState | null>();
  @Output() ownedChange = new EventEmitter<boolean>();

  states: string[] = Object.values(ComicState);

  getStateClass(state: string): string {
    return `state-${state.replace(" ", "-")}`;
  }

  onStateChange(newState: ComicState) {
    this.valueChange.emit(newState);
  }

  onOwnedChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.ownedChange.emit(checkbox.checked);
    if (!checkbox.checked) {
      // When marking as not owned, clear the state
      this.valueChange.emit(null);
    } else {
      // When marking as owned, set state to new
      this.valueChange.emit(ComicState.new);
    }
  }
}
