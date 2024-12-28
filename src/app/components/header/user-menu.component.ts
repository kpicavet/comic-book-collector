import { Component, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-user-menu",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <!-- Settings button -->
      <button
        (click)="toggleDropdown()"
        class="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
        aria-label="User menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      <!-- Dropdown menu -->
      <div
        *ngIf="isOpen"
        class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
      >
        <!-- User email -->
        <div class="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
          {{ authService.currentUser?.email }}
        </div>

        <!-- Logout button -->
        <button
          (click)="logout()"
          class="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  `,
})
export class UserMenuComponent {
  isOpen = false;

  constructor(public authService: AuthService) {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest("app-user-menu")) {
      this.isOpen = false;
    }
  }

  async logout() {
    await this.authService.signOut();
    this.isOpen = false;
  }
}
