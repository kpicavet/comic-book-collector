import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ComicTitleComponent } from './comic-title.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ComicTitleComponent],
  template: `
    <header class="sticky top-0 z-50 bg-white shadow-md w-full mb-8">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex-1">
            <app-comic-title></app-comic-title>
          </div>
          <button 
            class="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
            (click)="onLogout()"
            aria-label="Logout"
          >
            <span class="hidden sm:inline px-3 py-1">Logout</span>
            <span class="sm:hidden text-xl leading-none" aria-hidden="true">⇥</span>
          </button>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  async onLogout() {
    await this.authService.signOut();
  }
}