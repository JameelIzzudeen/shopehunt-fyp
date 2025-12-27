// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

// @Component({
//   selector: 'app-recommend-store',
//   templateUrl: './recommend-store.page.html',
//   styleUrls: ['./recommend-store.page.scss'],
//   standalone: true,
//   imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
// })

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
  ],
})



export class RecommendStorePage implements OnInit {

    userId: string | null = null; //maybe want to change it to number
    store: any[] = [];
    selectedCartItems: any[] = [];


  constructor(
    private http: HttpClient,
    private router: Router,
    private directionsService: DirectionsService
  ) { }

  async ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    this.selectedCartItems = JSON.parse(localStorage.getItem('selected_cart_items') || '[]');
    console.log('Selected Cart Items:', this.selectedCartItems);


    if (this.userId) {
      const userLocation = await this.getCurrentLocation();
      this.getRecommend(this.userId, userLocation, this.selectedCartItems);
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

  async getRecommend(user_id: string, userLocation: any, selectedCartItems: any[]) {
        this.http.post<any>(
      `${environment.Base_URL}/recommend-store.php`,
      { user_id, selected_cart_items: selectedCartItems }
    ).subscribe(async res => {
      if (res.status === 'success') {
        this.store = res.data;

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
