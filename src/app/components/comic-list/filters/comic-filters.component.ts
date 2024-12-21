import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComicState } from '../../../models/comic-book.model';

@Component({
  selector: 'app-comic-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-wrap gap-4 mb-8">
      <div class="flex-1 min-w-[200px]">
        <input
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          [(ngModel)]="searchValue"
          (ngModelChange)="onSearchChange($event)"
          placeholder="zoek op titel of nummer..."
        />
      </div>
      
      <select 
        [(ngModel)]="selectedState"
        (ngModelChange)="onStateChange($event)"
        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">alle statussen</option>
        <option *ngFor="let state of states" [value]="state">
          {{state}}
        </option>
      </select>

      <div class="flex gap-2">
        <button 
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          (click)="addClick.emit()"
        >
          Nieuw
        </button>
        <button 
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          (click)="uploadClick.emit()"
        >
          Upload Cover
        </button>
      </div>
    </div>
  `
})
export class ComicFiltersComponent {
  @Input() searchValue = '';
  @Input() selectedState = '';
  @Output() searchChange = new EventEmitter<string>();
  @Output() stateChange = new EventEmitter<string>();
  @Output() addClick = new EventEmitter<void>();
  @Output() uploadClick = new EventEmitter<void>();

  states: string[] = Object.values(ComicState);

  onSearchChange(value: string) {
    this.searchChange.emit(value);
  }

  onStateChange(value: string) {
    this.stateChange.emit(value);
  }
}