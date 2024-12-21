import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComicBook, ComicState } from '../../../models/comic-book.model';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ComicService } from '../../../services/comic.service';

@Component({
  selector: 'app-comic-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  template: `
    <app-modal title="Add New Comic Book" (close)="onCancel()">
      <form (submit)="onSubmit($event)" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Number *
          </label>
          <input
            type="number"
            [(ngModel)]="newComic.number"
            name="number"
            required
            min="1"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            [(ngModel)]="newComic.title"
            name="title"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            (change)="onFileSelected($event)"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-sm text-gray-500 mt-1">
            Upload an image
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            State *
          </label>
          <select 
            [(ngModel)]="newComic.state"
            name="state"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option *ngFor="let state of states" [value]="state">
              {{state}}
            </option>
          </select>
        </div>

        <div class="flex justify-end gap-2 pt-4">
          <button
            type="button"
            (click)="onCancel()"
            class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </app-modal>
  `
})
export class ComicFormComponent implements OnInit {
  @Output() save = new EventEmitter<{
    comic: Omit<ComicBook, 'id' | 'created_at' | 'updated_at'>;
    coverImage?: File;
  }>();
  @Output() cancel = new EventEmitter<void>();

  states = Object.keys(ComicState);
  selectedFile?: File;
  
  newComic = {
    number: 0,
    title: '',
    cover_url: '',
    state: ComicState.perfect
  };

  constructor(private comicService: ComicService) {}

  async ngOnInit() {
    this.newComic.number = await this.comicService.getNextAvailableNumber();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.newComic.cover_url && !this.selectedFile) {
      this.newComic.cover_url = this.comicService.getDefaultCoverUrl();
    }
    this.save.emit({ comic: this.newComic, coverImage: this.selectedFile });
    this.resetForm();
  }

  onCancel() {
    this.cancel.emit();
    this.resetForm();
  }

  private async resetForm() {
    this.selectedFile = undefined;
    this.newComic = {
      number: await this.comicService.getNextAvailableNumber(),
      title: '',
      cover_url: '',
      state: ComicState.perfect
    };
  }
}