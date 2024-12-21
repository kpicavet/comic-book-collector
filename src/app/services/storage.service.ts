import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private supabase: SupabaseClient;
  private readonly BUCKET_NAME = 'comic-covers';

  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.anonKey
    );
  }

  async uploadCover(file: File, comicNumber: number): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `comic-${comicNumber}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await this.supabase.storage
      .from(this.BUCKET_NAME)
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type
      });

    if (error) throw error;

    const { data: { publicUrl } } = this.supabase.storage
      .from(this.BUCKET_NAME)
      .getPublicUrl(filePath);

    return publicUrl;
  }

  async deleteCover(comicNumber: number): Promise<void> {
    const { data, error } = await this.supabase.storage
      .from(this.BUCKET_NAME)
      .list();

    if (error) throw error;

    const fileToDelete = data.find(file => 
      file.name.startsWith(`comic-${comicNumber}.`)
    );

    if (fileToDelete) {
      const { error: deleteError } = await this.supabase.storage
        .from(this.BUCKET_NAME)
        .remove([fileToDelete.name]);

      if (deleteError) throw deleteError;
    }
  }
}