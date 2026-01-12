import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonFooter, IonTitle, IonToolbar, IonButton, IonInput, IonItem,IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonIcon} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { DirectionsService } from '../../../core/service/directions';
import { Geolocation } from '@capacitor/geolocation';

import { GoogleMapsLoaderService } from '../../../core/service/google-maps-loader';

declare var google: any;

@Component({
  selector: 'app-dashboard-customer',
  
  templateUrl: './dashboard-customer.page.html',
  styleUrls: ['./dashboard-customer.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonFooter,
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
    IonCardHeader,
    IonIcon,
  ],
})


export class DashboardCustomerPage implements OnInit {
  environment = environment; // ✅ expose to HTML

  userId: string | null = null; //maybe want to change it to number
  user: any = {};
  category: any[] = [];
  store: any[] = [];

  private http = inject(HttpClient);
  public router = inject(Router);
  private directionsService = inject(DirectionsService);
  private mapsLoader = inject(GoogleMapsLoaderService);

  async ngOnInit() {
    this.userId = localStorage.getItem('user_id');

    if (this.userId) {
      await this.mapsLoader.load();
      const userLocation = await this.getCurrentLocation();
      this.getUserData(this.userId, userLocation);
    }
    else {
      alert('Unauthorized access.');
      this.router.navigate(['/login']);
    }
  }

  async getCurrentLocation() {
    const position = await Geolocation.getCurrentPosition(
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
    return {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
  }

  async getUserData(user_id: string, userLocation: any) {
  this.http.post<any>(
    `${environment.Base_URL}/dashboard/customer.php`,
    { user_id }
  ).subscribe(async res => {

    if (res.status === 'success') {

      this.user = res.data;
      this.category = res.category;
      const rawStores = res.store;

      // Optional: get unique stores if multiple entries exist
      const uniqueStores = Array.from(
        new Map(rawStores.map((s: any) => [s.store_id, s])).values()
      );

      // Calculate distance safely
      const promises = uniqueStores.map(async (s: any) => {
        const storeLat = Number(s.latitude);
        const storeLng = Number(s.longitude);

        const routeData = await this.directionsService.getRoute(
          userLocation,
          { lat: storeLat, lng: storeLng }
        );

        return {
          ...s,
          distance: routeData.distance,
          duration: routeData.duration
        };
      });

      // Wait for all distances
      const storesWithDistance = await Promise.all(promises);

      // Sort ascending by distance
      this.store = storesWithDistance.sort((a, b) => a.distance - b.distance);

      console.log('Stores sorted by distance:', this.store);

    } else if (res.status === 'unauthorized') {
      alert('Unauthorized access.');
      this.router.navigate(['/login']);
    } else {
      alert(res.message);
    }
  });
}


}
