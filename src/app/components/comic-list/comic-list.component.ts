import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';
import { ComicBook, ComicState } from '../../models/comic-book.model';
import { ComicGridComponent } from './grid/comic-grid.component';
import { ComicFormComponent } from './form/comic-form.component';
import { ComicFiltersComponent } from './filters/comic-filters.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { UploadModalService } from '../../services/upload-modal.service';

@Component({
  selector: 'app-comic-list',
  standalone: true,
  imports: [
    CommonModule,
    ComicGridComponent,
    ComicFormComponent,
    ComicFiltersComponent,
    ImageUploadComponent
  ],
  template: `
    <div class="container mx-auto px-4">
      <app-comic-filters
        [searchValue]="searchTerm"
        [selectedState]="selectedState"
        (searchChange)="searchTerm = $event"
        (stateChange)="selectedState = $event"
        (addClick)="showAddForm = true"
        (uploadClick)="uploadModalService.openModal()"
      ></app-comic-filters>

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
      ></app-comic-grid>
    </div>
  `
})
export class ComicListComponent implements OnInit {
  comics: ComicBook[] = [];
  searchTerm = '';
  selectedState = '';
  showAddForm = false;

  constructor(
    private supabaseService: SupabaseService,
    public uploadModalService: UploadModalService
  ) {}

  ngOnInit() {
    this.supabaseService.getComicBooks().subscribe(comics => {
      this.comics = comics;
    });
  }

  get filteredComics() {
    return this.comics.filter(comic => {
      const searchLower = this.searchTerm.toLowerCase();
      const matchesSearch = 
        comic.title.toLowerCase().includes(searchLower) ||
        comic.number.toString().includes(searchLower);
      const matchesState = !this.selectedState || comic.state === this.selectedState;
      return matchesSearch && matchesState;
    });
  }

  async updateState({ id, state }: { id: string; state: ComicState }) {
    await this.supabaseService.updateComicState(id, state);
  }

  async addComic(data: { comic: Omit<ComicBook, 'id' | 'created_at' | 'updated_at'>, coverImage?: File }) {
    await this.supabaseService.addComicBook(data.comic, data.coverImage);
    this.showAddForm = false;
  }
}