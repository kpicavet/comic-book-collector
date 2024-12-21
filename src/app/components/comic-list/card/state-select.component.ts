import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComicState } from '../../../models/comic-book.model';

@Component({
  selector: 'app-state-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <select
      [ngModel]="value"
      (ngModelChange)="onStateChange($event)"
      class="w-full bg-white/90 backdrop-blur-sm text-gray-900 border border-white/30 rounded px-3 py-1.5
             hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option *ngFor="let state of states" [value]="state" [class]="getStateClass(state)">
        {{state}}
      </option>
    </select>
  `,
  styles: [`
    select option {
      background-color: white;
      color: #1f2937;
      padding: 8px;
    }
    
    .state-perfect { color: #064e3b; font-weight: 600; }
    .state-good { color: #16a34a; font-weight: 600; }
    .state-ok { color: #84cc16; font-weight: 600; }
    .state-oud { color: #f97316; font-weight: 600; }
    .state-versleten { color: #dc2626; font-weight: 600; }
    .state-niet-in-bezit { color: #6b7280; font-style: italic; }
  `]
})
export class StateSelectComponent {
  @Input() value!: ComicState;
  @Output() valueChange = new EventEmitter<ComicState>();

  states: string[] = Object.values(ComicState);
  
  getStateClass(state: string): string {
    return `state-${state.replace(' ', '-')}`;
  }

  onStateChange(newState: ComicState) {
    this.valueChange.emit(newState);
  }
}