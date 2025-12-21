import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonFooter, IonTitle, IonToolbar, IonButton, IonInput, IonItem,IonCard, IonCardContent, IonCardTitle, IonCardHeader} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { DirectionsService } from '../service/directions';
import { Geolocation } from '@capacitor/geolocation';

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
  ],
})


export class DashboardCustomerPage implements OnInit {

  userId: string | null = null; //maybe want to change it to number
  user: any = {};
  category: any[] = [];
  store: any[] = [];



  constructor(
    private http: HttpClient,
    private router: Router,
    private directionsService: DirectionsService

  ) { }

  async ngOnInit() {
    this.userId = localStorage.getItem('user_id');

    if (this.userId) {
      const userLocation = await this.getCurrentLocation();
      this.getUserData(this.userId, userLocation);
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
      `${environment.Base_URL}/dashboard.php`,
      { user_id }
    ).subscribe(async res => {

      if (res.status === 'success') {

        this.user = res.data;
        this.category = res.category;
        this.store = res.store;

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
