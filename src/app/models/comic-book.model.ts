export enum ComicState {
  veryOld = "versleten",
  old = "oud",
  ok = "ok",
  good = "goed",
  new = "nieuw",
}

export interface ComicBook {
  id: string;
  number: number;
  title: string;
  storage_url?: string;
  state: ComicState | null;
  owned: boolean;
  favorite: boolean;
  created_at: string;
  updated_at: string;
}
