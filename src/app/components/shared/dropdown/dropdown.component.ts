import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-dropdown",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <button
        (click)="toggle()"
        type="button"
        class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 
               bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
               transition-all"
        [attr.aria-expanded]="isOpen"
        [attr.aria-label]="label"
      >
        <!-- Icon -->
        <svg
          *ngIf="selected === 'admin'"
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        <svg
          *ngIf="selected === 'user'"
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>

        <!-- Label - hidden on mobile -->
        <span class="hidden md:inline">{{ selectedLabel }}</span>

        <!-- Dropdown arrow -->
        <svg
          class="w-4 h-4 transition-transform duration-200"
          [class.rotate-180]="isOpen"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <!-- Dropdown menu -->
      <div
        *ngIf="isOpen"
        class="absolute right-0 z-10 mt-1 bg-white rounded-lg shadow-lg border border-gray-200
               focus:outline-none min-w-[200px]"
        role="menu"
      >
        <div class="py-1">
          <button
            *ngFor="let option of options"
            (click)="selectOption(option)"
            class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
                   focus:bg-gray-100 focus:outline-none transition-colors"
            role="menuitem"
            [class.font-medium]="option.value === selected"
          >
            <!-- Option icon -->
            <svg
              *ngIf="option.value === 'admin'"
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 mr-2 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <svg
              *ngIf="option.value === 'user'"
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 mr-2 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>

            <!-- Option label -->
            <span class="flex-1">{{ option.label }}</span>

            <!-- Checkmark -->
            <svg
              *ngIf="option.value === selected"
              class="w-4 h-4 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class DropdownComponent {
  @Input() options: { label: string; value: string }[] = [];
  @Input() selected = "";
  @Input() label = "Select option";
  @Output() selectedChange = new EventEmitter<string>();

  isOpen = false;

  get selectedLabel(): string {
    return (
      this.options.find((opt) => opt.value === this.selected)?.label ||
      this.label
    );
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: { label: string; value: string }): void {
    this.selected = option.value;
    this.selectedChange.emit(option.value);
    this.isOpen = false;
  }
}
