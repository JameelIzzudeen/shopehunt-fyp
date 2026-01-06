import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonFooter, IonTitle, IonToolbar, IonButton, IonInput, IonItem,IonCard, IonCardContent, IonCardTitle, IonCardHeader} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { DirectionsService } from '../../../core/service/directions';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any;


@Component({
  selector: 'app-recommend-store',
  
  templateUrl: './recommend-store.page.html',
  styleUrls: ['./recommend-store.page.scss'],
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
    IonBackButton,
    IonButtons,
  ],
})



export class RecommendStorePage implements OnInit {

  environment = environment;

    userId: string | null = null; //maybe want to change it to number
    store: any[] = [];
    selectedCartItems: any[] = [];

    private http = inject(HttpClient);
    public router = inject(Router);
    private directionsService = inject(DirectionsService);

  async ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    this.selectedCartItems = JSON.parse(localStorage.getItem('selected_cart_items') || '[]');
    const selectedCartIds = this.selectedCartItems
    .filter(item => item.selected)
    .map(item => item.cart_id);

    console.log('Selected Cart Items:', selectedCartIds);
    

    if (this.userId) {
      const userLocation = await this.getCurrentLocation();
      this.getRecommend(this.userId, userLocation, selectedCartIds);
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

  async getRecommend(user_id: string, userLocation: any, selectedCartIds: any[]) {
        this.http.post<any>(
      `${environment.Base_URL}/recommend-store.php`,
      { user_id, selected_cart_items: selectedCartIds, user_lat: userLocation.lat, user_lng: userLocation.lng }
    ).subscribe(async res => {
      if (res.status === 'success') {
        this.store = res.recommended_stores || [];

        if (!Array.isArray(this.store) || this.store.length === 0) {
          console.warn('No recommended stores found');
          return;
        }

        // 🔑 Calculate distance PER STORE
        const promises = this.store.map(async (s: any) => {

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

        // 🔑 WAIT FOR ALL STORES
        this.store = await Promise.all(promises);

        console.log('Stores with distance:', this.store);

      } else {
        alert(res.message);
      }
 
    });
  }  

}
