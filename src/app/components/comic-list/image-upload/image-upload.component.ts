import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SupabaseService } from "../../../services/supabase.service";
import { ModalComponent } from "../../shared/modal/modal.component";
import { UploadModalService } from "../../../services/upload-modal.service";

@Component({
  selector: "app-image-upload",
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  template: `
    <app-modal title="Upload Comic Cover" (close)="close.emit()">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Comic Number *
          </label>
          <div
            *ngIf="comicNumber"
            class="px-3 py-2 bg-gray-100 rounded-md text-gray-700"
          >
            {{ comicNumber }}
          </div>
          <input
            *ngIf="!comicNumber"
            type="number"
            [(ngModel)]="inputComicNumber"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Cover Image *
          </label>
          <input
            type="file"
            accept="image/*"
            (change)="onFileSelected($event)"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Feedback Messages -->
        <div
          *ngIf="feedback"
          class="mt-2"
          [ngClass]="{
            'text-green-600': !feedback.error,
            'text-red-600': feedback.error
          }"
        >
          {{ feedback.message }}
        </div>

        <div class="flex justify-end gap-2 pt-4">
          <button
            type="button"
            (click)="close.emit()"
            class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            [disabled]="isUploading"
          >
            Cancel
          </button>
          <button
            (click)="uploadImage()"
            class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            [disabled]="
              !selectedFile ||
              (!comicNumber && !inputComicNumber) ||
              isUploading
            "
          >
            <span *ngIf="!isUploading">Upload</span>
            <span *ngIf="isUploading">Uploading...</span>
          </button>
        </div>
      </div>
    </app-modal>
  `,
})
export class ImageUploadComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  selectedFile?: File;
  comicNumber?: number;
  inputComicNumber?: number;
  isUploading = false;
  feedback?: { message: string; error: boolean };

  constructor(
    private supabaseService: SupabaseService,
    private uploadModalService: UploadModalService
  ) {}

  ngOnInit() {
    this.uploadModalService.showModal$.subscribe(({ comicNumber }) => {
      this.comicNumber = comicNumber;
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.feedback = undefined;
    }
  }

  async uploadImage() {
    if (!this.selectedFile || (!this.comicNumber && !this.inputComicNumber))
      return;

    this.isUploading = true;
    this.feedback = undefined;

    try {
      await this.supabaseService.updateComicCover(
        this.comicNumber || this.inputComicNumber!,
        this.selectedFile
      );
      this.feedback = {
        message: "Cover image uploaded successfully!",
        error: false,
      };
      // Auto-close after successful upload
      setTimeout(() => this.close.emit(), 1500);
    } catch (error) {
      this.feedback = {
        message: "Failed to upload cover. Please try again.",
        error: true,
      };
    } finally {
      this.isUploading = false;
    }
  }
}
