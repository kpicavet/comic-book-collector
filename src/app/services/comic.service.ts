import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { firstValueFrom } from 'rxjs';
import { ComicBook } from '../models/comic-book.model';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  readonly DEFAULT_COVER_URL = 'https://via.placeholder.com/400x560/f3f4f6/94a3b8?text=No+Cover+Available';

  constructor(private supabaseService: SupabaseService) {}

  getDefaultCoverUrl(): string {
    return this.DEFAULT_COVER_URL;
  }

  async getNextAvailableNumber(): Promise<number> {
    const comics = await firstValueFrom(this.supabaseService.getComicBooks());
    const maxNumber = Math.max(...comics.map(comic => comic.number), 0);
    return maxNumber + 1;
  }
}