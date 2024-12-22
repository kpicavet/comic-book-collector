import { Injectable } from "@angular/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth.service";
import { StorageService } from "./storage.service";
import { ComicBook, ComicState } from "../models/comic-book.model";

@Injectable({
  providedIn: "root",
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

  private updateLocalComic(id: string, updates: Partial<ComicBook>) {
    const currentComics = this.comicBooks.value;
    const updatedComics = currentComics.map((comic) =>
      comic.id === id ? { ...comic, ...updates } : comic
    );
    this.comicBooks.next(updatedComics);
  }

  async loadComicBooks() {
    if (!this.authService.currentUser) return;

    const { data, error } = await this.supabase
      .from("comic_books")
      .select("*")
      .order("number");

    if (error) {
      console.error("Error loading comic books:", error);
      return;
    }

    this.comicBooks.next(data);
  }

  async addComicBook(
    comic: Omit<ComicBook, "id" | "created_at" | "updated_at">,
    coverImage?: File
  ) {
    if (!this.authService.currentUser) return;

    let storageUrl: string | undefined;

    try {
      if (coverImage) {
        storageUrl = await this.storageService.uploadCover(
          coverImage,
          comic.number
        );
      }

      const { error } = await this.supabase.from("comic_books").insert([
        {
          ...comic,
          storage_url: storageUrl,
          favorite: false, // Set default value
        },
      ]);

      if (error) throw error;

      await this.loadComicBooks();
    } catch (error) {
      console.error("Error adding comic book:", error);
      if (storageUrl) {
        await this.storageService
          .deleteCover(comic.number)
          .catch(console.error);
      }
      throw error;
    }
  }

  async updateComicState(id: string, state: ComicState | null) {
    if (!this.authService.currentUser) return;

    this.updateLocalComic(id, { state, updated_at: new Date().toISOString() });

    const { error } = await this.supabase
      .from("comic_books")
      .update({
        state,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating comic state:", error);
      await this.loadComicBooks();
      return;
    }
  }

  async updateComicOwned(id: string, owned: boolean) {
    if (!this.authService.currentUser) return;

    const state = owned ? ComicState.new : null;
    const favorite = owned ? false : undefined; // Reset favorite only when marking as owned

    this.updateLocalComic(id, {
      owned,
      state,
      favorite,
      updated_at: new Date().toISOString(),
    });

    const { error } = await this.supabase
      .from("comic_books")
      .update({
        owned,
        state,
        favorite,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating comic owned status:", error);
      await this.loadComicBooks();
      return;
    }
  }

  async updateComicFavorite(id: string, favorite: boolean) {
    if (!this.authService.currentUser) return;

    this.updateLocalComic(id, {
      favorite,
      updated_at: new Date().toISOString(),
    });

    const { error } = await this.supabase
      .from("comic_books")
      .update({
        favorite,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating comic favorite status:", error);
      await this.loadComicBooks();
      return;
    }
  }

  async updateComicCover(comicNumber: number, file: File) {
    if (!this.authService.currentUser) return;

    try {
      const storageUrl = await this.storageService.uploadCover(
        file,
        comicNumber
      );

      const { error } = await this.supabase
        .from("comic_books")
        .update({
          storage_url: storageUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("number", comicNumber);

      if (error) throw error;

      await this.loadComicBooks();
    } catch (error) {
      console.error("Error updating comic cover:", error);
      throw error;
    }
  }
}
