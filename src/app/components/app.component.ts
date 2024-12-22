import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComicListComponent } from "./comic-list/comic-list.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthService } from "../services/auth.service";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, ComicListComponent, AuthComponent, HeaderComponent],
  template: `
    <ng-container *ngIf="authService.user$ | async as user; else auth">
      <app-header></app-header>
      <main>
        <app-comic-list></app-comic-list>
      </main>
    </ng-container>
    <ng-template #auth>
      <app-auth></app-auth>
    </ng-template>
  `,
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}
