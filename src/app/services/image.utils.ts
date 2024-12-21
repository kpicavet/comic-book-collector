import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

export function getComicImageUrl(
  storageUrl?: string,
  coverUrl?: string,
  sanitizer?: DomSanitizer
): SafeStyle | string {
  const fallbackUrl = 'https://via.placeholder.com/400x560/f3f4f6/94a3b8?text=No+Cover+Available';
  const url = storageUrl || coverUrl || fallbackUrl;
  
  if (!sanitizer) return url;
  return sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
}