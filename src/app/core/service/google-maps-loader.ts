import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsLoaderService {

  private loadingPromise: Promise<void> | null = null;

  load(): Promise<void> {

    // Already loaded
    if ((window as any).google?.maps) {
      return Promise.resolve();
    }

    // Already loading
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onload = () => resolve();
      script.onerror = () => reject('Google Maps failed to load');

      document.head.appendChild(script);
    });

    return this.loadingPromise;
  }
}
