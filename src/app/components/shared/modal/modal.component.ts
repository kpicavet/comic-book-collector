import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-modal",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-xl font-semibold">{{ title }}</h2>
          <button
            (click)="close.emit()"
            class="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>
        <div class="p-4">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class ModalComponent {
  @Input() title = "";
  @Output() close = new EventEmitter<void>();
}
