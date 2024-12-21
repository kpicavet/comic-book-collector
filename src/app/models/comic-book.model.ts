export enum ComicState {
  veryOld = 'versleten',
  old = 'oud',
  ok = 'ok',
  good = 'good',
  perfect = 'perfect',
  notOwned = 'niet in bezit'
}


export interface ComicBook {
  id: string;
  number: number;
  title: string;
  cover_url: string;
  storage_url?: string;
  state: ComicState;
  created_at: string;
  updated_at: string;
}