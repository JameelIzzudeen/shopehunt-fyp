import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonFooter, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonItem,IonCard, IonCardContent, IonCardTitle, IonCardHeader} from '@ionic/angular/standalone';

import { DirectionsService } from '../../core/service/directions';


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
  // imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
  imports: [
    IonFooter,
    IonButtons,
    IonBackButton,
    CommonModule,
    // RouterModule,
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
    IonCardHeader,
  ],
})
export class NavigatePage implements OnInit {

  storeLat!: number;
  storeLng!: number;

  distance!: string;
  duration!: string;

  private http = inject(HttpClient);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private directionsService = inject(DirectionsService);

  // constructor(
  //   private http: HttpClient,
  //   private router: Router,
  //   private route: ActivatedRoute,
  //   private directionsService: DirectionsService
  // ) {}

  async ngOnInit() {

    const permission = await Geolocation.requestPermissions();

    if (permission.location !== 'granted') {
      alert('Location permission is required to use navigation');
      return;
    }

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

  // loadMap(userLocation: any) {
  //   const map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 15,
  //     center: userLocation
  //   });

  //   const directionsService = new google.maps.DirectionsService();
  //   const directionsRenderer = new google.maps.DirectionsRenderer();
  //   directionsRenderer.setMap(map);
    
  //   this.directionsService
  //   .getRoute(
  //     userLocation,
  //     { lat: this.storeLat, lng: this.storeLng }
  //   )
  //   .then(data => {

  //     const directionsRenderer = new google.maps.DirectionsRenderer({
  //       suppressMarkers: true
  //     });

  //     directionsRenderer.setMap(map);
  //     directionsRenderer.setDirections(data.result);

  //     this.distance = data.distance;
  //     this.duration = data.duration;
  //   })
  //   .catch(err => {
  //     console.error('Directions error:', err);
  //   });
  // }

  loadMap(userLocation: any) {

  const map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 15,
      center: userLocation
    }
  );

  /* 📍 YOU ARE HERE */
  new google.maps.Marker({
    position: userLocation,
    map,
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

// DESTINATION
new google.maps.Marker({
  position: { lat: this.storeLat, lng: this.storeLng },
  map,
  title: 'Destination'
  });

  /* 🧭 ROUTE (optional but helpful) */
  this.directionsService
    .getRoute(
      userLocation,
      { lat: this.storeLat, lng: this.storeLng }
    )
    .then(data => {

      const directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true
      });

      directionsRenderer.setMap(map);
      directionsRenderer.setDirections(data.result);

      this.distance = data.distance;
      this.duration = data.duration;
    });
}

}



