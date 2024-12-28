import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

export type ViewMode = "grid" | "list";

@Component({
  selector: "app-view-toggle",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-2">
      <button
        (click)="onViewChange('grid')"
        class="p-2 rounded-lg transition-colors"
        [class.bg-blue-500]="currentView === 'grid'"
        [class.text-white]="currentView === 'grid'"
        [class.bg-gray-100]="currentView !== 'grid'"
        [class.hover:bg-gray-200]="currentView !== 'grid'"
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
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      </button>
      <button
        (click)="onViewChange('list')"
        class="p-2 rounded-lg transition-colors"
        [class.bg-blue-500]="currentView === 'list'"
        [class.text-white]="currentView === 'list'"
        [class.bg-gray-100]="currentView !== 'list'"
        [class.hover:bg-gray-200]="currentView !== 'list'"
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  `,
})
export class ViewToggleComponent {
  @Input() currentView: ViewMode = "grid";
  @Output() viewChange = new EventEmitter<ViewMode>();

  onViewChange(view: ViewMode) {
    this.viewChange.emit(view);
  }
}
