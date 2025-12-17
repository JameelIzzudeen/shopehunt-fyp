import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { Geolocation } from '@capacitor/geolocation';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.page.html',
  styleUrls: ['./navigate.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NavigatePage implements OnInit {

    storeLat!: number;
    storeLng!: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      this.storeLat = Number(params['lat']);
      this.storeLng = Number(params['lng']);

      const userLocation = await this.getCurrentLocation();
      this.loadMap(userLocation);
    });
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

  loadMap(userLocation: any) {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: userLocation
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    directionsService.route(
      {
        origin: userLocation,
        destination: {
          lat: this.storeLat,
          lng: this.storeLng
        },
        travelMode: 'DRIVING'
      },
      (result: any, status: any) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
        }
      }
    );
  }

  // loadMap(userLocation: { lat: number; lng: number }) {

  //   // 1. Create the map
  //   const map = new google.maps.Map(
  //     document.getElementById('map'),
  //     {
  //       center: userLocation,
  //       zoom: 15
  //     }
  //   );

  //   // 2. USER LOCATION MARKER ✅
  //   new google.maps.Marker({
  //     position: userLocation,
  //     map: map,
  //     title: 'You are here'
  //   });

  //   // 3. STORE LOCATION MARKER (Optional but recommended)
  //   new google.maps.Marker({
  //     position: {
  //       lat: this.storeLat,
  //       lng: this.storeLng
  //     },
  //     map: map,
  //     title: 'Store Location'
  //   });

  //   // 4. Directions
  //   const directionsService = new google.maps.DirectionsService();
  //   const directionsRenderer = new google.maps.DirectionsRenderer({
  //     suppressMarkers: true // we use our own markers
  //   });

  //   directionsRenderer.setMap(map);

  //   directionsService.route(
  //     {
  //       origin: userLocation,
  //       destination: {
  //         lat: this.storeLat,
  //         lng: this.storeLng
  //       },
  //       travelMode: google.maps.TravelMode.DRIVING
  //     },
  //     (result: any, status: any) => {
  //       if (status === 'OK') {
  //         directionsRenderer.setDirections(result);
  //       }
  //     }
  //   );
  // }


}



