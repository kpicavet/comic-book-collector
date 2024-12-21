import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-auth",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>{{ isLogin ? "Login" : "Registreer" }}</h2>
        <form (submit)="onSubmit($event)">
          <input
            type="email"
            [(ngModel)]="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            type="password"
            [(ngModel)]="password"
            name="password"
            placeholder="Password"
            required
          />
          <button type="submit">{{ isLogin ? "Login" : "Registreer" }}</button>
        </form>
        <!-- <p>
          {{ isLogin ? "nieuw account nodig?" : "Al een account?" }}
          <button class="link" (click)="toggleMode()">
            {{ isLogin ? "Registreer" : "Login" }}
          </button>
        </p> -->
      </div>
    </div>
  `,
  styles: [
    `
      .auth-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #f5f5f5;
      }
      .auth-card {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
      }
      input {
        width: 100%;
        padding: 0.5rem;
        margin: 0.5rem 0;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      button {
        width: 100%;
        padding: 0.5rem;
        margin: 0.5rem 0;
        background: #4caf50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button.link {
        background: none;
        color: #4caf50;
        text-decoration: underline;
        padding: 0;
        margin: 0;
        width: auto;
      }
    `,
  ],
})
export class AuthComponent {
  email = "";
  password = "";
  isLogin = true;

  constructor(private authService: AuthService) {}

  async onSubmit(event: Event) {
    event.preventDefault();
    try {
      if (this.isLogin) {
        await this.authService.signIn(this.email, this.password);
      } else {
        // await this.authService.signUp(this.email, this.password);
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
  }
}
