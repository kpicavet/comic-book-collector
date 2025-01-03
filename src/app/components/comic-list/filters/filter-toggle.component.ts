import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-filter-toggle",
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (click)="toggle.emit()"
      class="p-2 rounded-lg transition-colors"
      [class.bg-blue-500]="isOpen"
      [class.text-white]="isOpen"
      [class.bg-gray-100]="!isOpen"
      [class.hover:bg-gray-200]="!isOpen"
      title="Toggle filters"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="{2}"
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>
    </button>
  `,
})
export class FilterToggleComponent {
  @Input() isOpen = false;
  @Output() toggle = new EventEmitter<void>();
}
