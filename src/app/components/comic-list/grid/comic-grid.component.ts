import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicBook, ComicState } from '../../../models/comic-book.model';
import { ComicCardComponent } from '../card/comic-card.component';

@Component({
  selector: 'app-comic-grid',
  standalone: true,
  imports: [CommonModule, ComicCardComponent],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <app-comic-card
        *ngFor="let comic of comics"
        [comic]="comic"
        (stateChange)="stateChange.emit($event)"
      ></app-comic-card>
    </div>
  `
})
export class ComicGridComponent {
  @Input() comics: ComicBook[] = [];
  @Output() stateChange = new EventEmitter<{id: string, state: ComicState}>();
}