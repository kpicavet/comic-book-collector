import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-comic-title",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="comic-title">
      <span class="main-title">Tibo's collectie:</span>
      <span class="sub-title">Jommeke</span>
    </h1>
  `,
  styles: [
    `
      .comic-title {
        font-family: "Comic Sans MS", cursive, sans-serif;
        text-align: center;
        line-height: 1;
        margin: 0;
        padding: 0.25em;
        position: relative;
        transform: rotate(-2deg);
      }

      .main-title {
        display: block;
        font-size: clamp(1rem, 4vw, 1.5rem);
        color: #2563eb;
        text-shadow: 2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff,
          -2px 2px 0 #fff, 4px 4px 0 rgba(0, 0, 0, 0.2);
        margin-bottom: 0.2em;
      }

      .sub-title {
        display: block;
        font-size: clamp(1.5rem, 6vw, 2.5rem);
        font-weight: bold;
        color: #ef4444;
        letter-spacing: 0.05em;
        text-shadow: 3px 3px 0 #fff, -3px -3px 0 #fff, 3px -3px 0 #fff,
          -3px 3px 0 #fff, 6px 6px 0 rgba(0, 0, 0, 0.2);
      }

      @media (max-width: 640px) {
        .comic-title {
          transform: rotate(-1deg);
          padding: 0.125em;
        }

        .main-title {
          margin-bottom: 0.1em;
        }

        .sub-title {
          transform: scale(1.1);
        }
      }
    `,
  ],
})
export class ComicTitleComponent {}
