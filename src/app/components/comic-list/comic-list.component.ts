import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SupabaseService } from "../../services/supabase.service";
import { ComicBook, ComicState } from "../../models/comic-book.model";
import { ComicGridComponent } from "./grid/comic-grid.component";
import { ComicFormComponent } from "./form/comic-form.component";
import { FilterSectionComponent } from "./filters/filter-section.component";
import { ImageUploadComponent } from "./image-upload/image-upload.component";
import { UploadModalService } from "../../services/upload-modal.service";

@Component({
  selector: "app-comic-list",
  standalone: true,
  imports: [
    CommonModule,
    ComicGridComponent,
    ComicFormComponent,
    FilterSectionComponent,
    ImageUploadComponent,
  ],
  template: `
    <div class="container mx-auto px-4">
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

      <app-comic-form
        *ngIf="showAddForm"
        (save)="addComic($event)"
        (cancel)="showAddForm = false"
      ></app-comic-form>

      <app-image-upload
        *ngIf="(uploadModalService.showModal$ | async)?.show"
        (close)="uploadModalService.closeModal()"
      ></app-image-upload>

      <app-comic-grid
        [comics]="filteredComics"
        (stateChange)="updateState($event)"
        (ownedChange)="updateOwned($event)"
        (favoriteChange)="updateFavorite($event)"
      ></app-comic-grid>
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

  constructor(
    private supabaseService: SupabaseService,
    public uploadModalService: UploadModalService
  ) {}

  ngOnInit() {
    this.supabaseService.getComicBooks().subscribe((comics) => {
      this.comics = comics;
    });
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
