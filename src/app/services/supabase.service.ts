import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { ComicBook, ComicState } from '../models/comic-book.model';
import { withRetry } from './database.utils';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private comicBooks = new BehaviorSubject<ComicBook[]>([]);

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.anonKey
    );
    this.loadComicBooks();
  }

  getComicBooks(): Observable<ComicBook[]> {
    return this.comicBooks.asObservable();
  }

  async loadComicBooks() {
    if (!this.authService.currentUser) return;

    const { data, error } = await this.supabase
      .from('comic_books')
      .select('*')
      .order('number');

    if (error) {
      console.error('Error loading comic books:', error);
      return;
    }

    this.comicBooks.next(data);
  }

  async updateComicState(id: string, state: ComicState) {
    if (!this.authService.currentUser) return;

    const { error } = await this.supabase
      .from('comic_books')
      .update({ 
        state, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating comic state:', error);
      return;
    }

    await this.loadComicBooks();
  }

  async addComicBook(
    comic: Omit<ComicBook, 'id' | 'created_at' | 'updated_at'>,
    coverImage?: File
  ) {
    if (!this.authService.currentUser) return;

    let storageUrl: string | undefined;

    try {
      if (coverImage) {
        storageUrl = await this.storageService.uploadCover(coverImage, comic.number);
      }

      const { error } = await this.supabase
        .from('comic_books')
        .insert([{
          ...comic,
          storage_url: storageUrl
        }]);

      if (error) throw error;

      await this.loadComicBooks();
    } catch (error) {
      console.error('Error adding comic book:', error);
      // If we uploaded an image but failed to create the record, clean up
      if (storageUrl) {
        await this.storageService.deleteCover(comic.number).catch(console.error);
      }
      throw error;
    }
  }

  async updateComicCover(comicNumber: number, file: File) {
    if (!this.authService.currentUser) return;

    try {
      // Upload to storage bucket and get URL
      const storageUrl = await this.storageService.uploadCover(file, comicNumber);

      // Update database with new URL
      const { error } = await this.supabase
        .from('comic_books')
        .update({ 
          storage_url: storageUrl,
          updated_at: new Date().toISOString()
        })
        .eq('number', comicNumber);

      if (error) throw error;

      await this.loadComicBooks();
    } catch (error) {
      console.error('Error updating comic cover:', error);
      throw error;
    }
  }
}