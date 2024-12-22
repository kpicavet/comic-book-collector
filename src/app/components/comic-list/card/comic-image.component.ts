import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DomSanitizer } from "@angular/platform-browser";
import { ComicState } from "../../../models/comic-book.model";
import { getComicImageUrl } from "../../../services/image.utils";

@Component({
  selector: "app-comic-image",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="absolute inset-0 bg-cover bg-center transition-all duration-300"
      [style.background-image]="backgroundImage"
      [style.opacity]="!owned ? '0.5' : '1'"
      [style.filter]="getFilter()"
    ></div>
  `,
})
export class ComicImageComponent {
  @Input() storageUrl?: string;
  @Input() state?: ComicState;
  @Input() owned = true;

  ComicState = ComicState;

  constructor(private sanitizer: DomSanitizer) {}

  get backgroundImage() {
    return getComicImageUrl(this.storageUrl, this.sanitizer);
  }

  getFilter(): string {
    if (!this.owned) return "none";

    switch (this.state) {
      case ComicState.veryOld:
        return "grayscale(100%) contrast(120%)"; // Darker grayscale for very old
      case ComicState.old:
        return "grayscale(70%) contrast(105%)"; // Lighter grayscale for old
      default:
        return "none";
    }
  }
}
