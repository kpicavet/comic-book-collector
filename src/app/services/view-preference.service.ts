import { Injectable } from "@angular/core";
import { ViewMode } from "../components/comic-list/views/view-toggle.component";

@Injectable({
  providedIn: "root",
})
export class ViewPreferenceService {
  private readonly STORAGE_KEY = "comic-view-mode";

  getPreferredView(): ViewMode {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored === "list" || stored === "grid" ? stored : "grid";
  }

  setPreferredView(mode: ViewMode): void {
    localStorage.setItem(this.STORAGE_KEY, mode);
  }
}
