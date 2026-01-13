import { Capacitor } from '@capacitor/core';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonFooter,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonItem,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader
} from '@ionic/angular/standalone';

import { DirectionsService } from '../../core/service/directions';
import { Geolocation } from '@capacitor/geolocation';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

// declare var google: any;

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.page.html',
  styleUrls: ['./navigate.page.scss'],
  standalone: true,
  imports: [
    IonFooter,
    IonButtons,
    IonBackButton,
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonInput,
    IonItem,
    FormsModule,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader
  ],
})
export class NavigatePage implements OnInit {

  storeLat!: number;
  storeLng!: number;

  distance!: string;
  duration!: string;

  isWeb = Capacitor.getPlatform() === 'web';

  private initialized = false;
  private routeRequestId = 0;

  private map!: google.maps.Map;
  private directionsRenderer!: google.maps.DirectionsRenderer;

  private http = inject(HttpClient);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private directionsService = inject(DirectionsService);

  async ngOnInit() {
    if (this.initialized) return;
    this.initialized = true;

    const params = await firstValueFrom(this.route.queryParams);

    this.storeLat = Number(params['lat']);
    this.storeLng = Number(params['lng']);

    if (!this.storeLat || !this.storeLng) {
      alert('Invalid destination');
      return;
    }

    try {
      const userLocation = this.isWeb
        ? await this.getWebLocation()
        : await this.getNativeLocation();

      this.initMap(userLocation);
      this.loadRoute(userLocation);
    } catch (err) {
      console.error(err);
      alert('Failed to get location');
    }
  }

  /* =============================
     GET LOCATION (WEB AND NATIVE)
  ============================== */

  async getNativeLocation() {
    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000
    });

    return {
      lat: position.coords.latitude,
      lng: position.coords.longitude
      // lat: 4.266711143751758,
      // lng: 118.01374062897702
    };
  }

  getWebLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation not supported');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        pos => resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
          // lat: 4.266711143751758,
          // lng: 118.01374062897702
        }),
        err => reject(err)
      );
    });
  }

  /* =============================
     MAP
  ============================== */

initMap(userLocation: any) {
  const mapEl = document.getElementById('map');

  if (!mapEl) {
    console.error('Map element not found');
    return;
  }

  this.map = new google.maps.Map(mapEl, {
    zoom: 15,
    center: userLocation
  });

  /* USER MARKER */
  new google.maps.Marker({
    position: userLocation,
    map: this.map,
    title: 'You are here',
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
      fillColor: '#1e90ff',
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 2
    }
  });

  /* DESTINATION MARKER */
  new google.maps.Marker({
    position: { lat: this.storeLat, lng: this.storeLng },
    map: this.map,
    title: 'Destination'
  });

  this.directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true
  });
  this.directionsRenderer.setMap(this.map);
}


  /* =============================
     ROUTE
  ============================== */

  loadRoute(userLocation: any) {
    const requestId = ++this.routeRequestId;

    this.directionsService
      .getRoute(
        userLocation,
        { lat: this.storeLat, lng: this.storeLng }
      )
      .then(data => {
        if (requestId !== this.routeRequestId) return; // stale result

        this.directionsRenderer.setDirections(data.result);
        this.distance = data.distance;
        this.duration = data.duration;
      })
      .catch(err => console.error('Directions error:', err));
  }
}
