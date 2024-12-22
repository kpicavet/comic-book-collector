import { Injectable } from "@angular/core";
import { SupabaseService } from "./supabase.service";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ComicService {
  constructor(private supabaseService: SupabaseService) {}

  async getNextAvailableNumber(): Promise<number> {
    const comics = await firstValueFrom(this.supabaseService.getComicBooks());
    const maxNumber = Math.max(...comics.map((comic) => comic.number), 0);
    return maxNumber + 1;
  }
}
