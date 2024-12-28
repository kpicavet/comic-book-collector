import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComicTitleComponent } from "./comic-title.component";
import { UserMenuComponent } from "./user-menu.component";
import { RoleSelectorComponent } from "./role-selector.component";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    CommonModule,
    ComicTitleComponent,
    UserMenuComponent,
    RoleSelectorComponent,
  ],
  template: `
    <header class="sticky top-0 z-50 bg-white shadow-md w-full mb-8">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Title -->
          <div class="flex-shrink-0">
            <app-comic-title></app-comic-title>
          </div>

          <!-- Right side controls -->
          <div class="flex items-center gap-4">
            <app-role-selector></app-role-selector>
            <app-user-menu></app-user-menu>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {}
