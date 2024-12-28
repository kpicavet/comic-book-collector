import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SupabaseService } from "../../services/supabase.service";
import { ComicBook, ComicState } from "../../models/comic-book.model";
import { ComicGridComponent } from "./grid/comic-grid.component";
import { ComicFormComponent } from "./form/comic-form.component";
import { FilterSectionComponent } from "./filters/filter-section.component";
import { ImageUploadComponent } from "./image-upload/image-upload.component";
import { UploadModalService } from "../../services/upload-modal.service";
import { ViewToggleComponent, ViewMode } from "./views/view-toggle.component";
import { CompactListComponent } from "./views/compact-list.component";
import { ViewPreferenceService } from "../../services/view-preference.service";
import { FilterToggleComponent } from "./filters/filter-toggle.component";

@Component({
  selector: "app-comic-list",
  standalone: true,
  imports: [
    CommonModule,
    ComicGridComponent,
    ComicFormComponent,
    FilterSectionComponent,
    ImageUploadComponent,
    ViewToggleComponent,
    CompactListComponent,
    FilterToggleComponent,
  ],
  template: `
    <div class="container mx-auto px-4">
      <!-- View controls -->
      <div class="flex justify-end items-center gap-2 mb-4">
        <app-filter-toggle
          [isOpen]="showFilters"
          (toggle)="showFilters = !showFilters"
        ></app-filter-toggle>
        <app-view-toggle
          [currentView]="currentView"
          (viewChange)="onViewChange($event)"
        ></app-view-toggle>
      </div>

      <!-- Filters -->
      <div *ngIf="showFilters" class="mb-4">
        <app-filter-section
          [searchValue]="searchTerm"
          [selectedState]="selectedState"
          [selectedOwned]="selectedOwned"
          [selectedFavorite]="selectedFavorite"
          (searchChange)="searchTerm = $event"
          (stateChange)="selectedState = $event"
          (ownedChange)="selectedOwned = $event"
          (favoriteChange)="selectedFavorite = $event"
          (addClick)="showAddForm = true"
          (uploadClick)="uploadModalService.openModal()"
        ></app-filter-section>
      </div>

      <!-- Forms and modals -->
      <app-comic-form
        *ngIf="showAddForm"
        (save)="addComic($event)"
        (cancel)="showAddForm = false"
      ></app-comic-form>

      <app-image-upload
        *ngIf="(uploadModalService.showModal$ | async)?.show"
        (close)="uploadModalService.closeModal()"
      ></app-image-upload>

      <!-- Comic list/grid views -->
      <div>
        <ng-container [ngSwitch]="currentView">
          <app-comic-grid
            *ngSwitchCase="'grid'"
            [comics]="filteredComics"
            (stateChange)="updateState($event)"
            (ownedChange)="updateOwned($event)"
            (favoriteChange)="updateFavorite($event)"
          ></app-comic-grid>

          <app-compact-list
            *ngSwitchCase="'list'"
            [comics]="filteredComics"
            (stateChange)="updateState($event)"
            (ownedChange)="updateOwned($event)"
            (favoriteChange)="updateFavorite($event)"
          ></app-compact-list>
        </ng-container>
      </div>
    </div>
  `,
})
export class ComicListComponent implements OnInit {
  comics: ComicBook[] = [];
  searchTerm = "";
  selectedState = "";
  selectedOwned = "";
  selectedFavorite = "";
  showAddForm = false;
  showFilters = false;
  currentView: ViewMode;

  constructor(
    private supabaseService: SupabaseService,
    public uploadModalService: UploadModalService,
    private viewPreferenceService: ViewPreferenceService
  ) {
    this.currentView = this.viewPreferenceService.getPreferredView();
  }

  ngOnInit() {
    this.supabaseService.getComicBooks().subscribe((comics) => {
      this.comics = comics;
    });
  }

  onViewChange(view: ViewMode) {
    this.currentView = view;
    this.viewPreferenceService.setPreferredView(view);
  }

  get filteredComics() {
    return this.comics.filter((comic) => {
      const searchLower = this.searchTerm.toLowerCase();
      const matchesSearch =
        comic.title.toLowerCase().includes(searchLower) ||
        comic.number.toString().includes(searchLower);
      const matchesState =
        !this.selectedState || comic.state === this.selectedState;
      const matchesOwned =
        !this.selectedOwned || comic.owned === (this.selectedOwned === "true");
      const matchesFavorite =
        !this.selectedFavorite ||
        (this.selectedFavorite === "true" ? comic.favorite : !comic.favorite);
      return matchesSearch && matchesState && matchesOwned && matchesFavorite;
    });
  }

  async updateState({ id, state }: { id: string; state: ComicState | null }) {
    await this.supabaseService.updateComicState(id, state);
  }

  async updateOwned({ id, owned }: { id: string; owned: boolean }) {
    await this.supabaseService.updateComicOwned(id, owned);
  }

  async updateFavorite({ id, favorite }: { id: string; favorite: boolean }) {
    await this.supabaseService.updateComicFavorite(id, favorite);
  }

  async addComic(data: {
    comic: Omit<ComicBook, "id" | "created_at" | "updated_at">;
    coverImage?: File;
  }) {
    await this.supabaseService.addComicBook(data.comic, data.coverImage);
    this.showAddForm = false;
  }
}
