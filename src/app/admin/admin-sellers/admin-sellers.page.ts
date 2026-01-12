// import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

// @Component({
//   selector: 'app-admin-sellers',
//   templateUrl: './admin-sellers.page.html',
//   styleUrls: ['./admin-sellers.page.scss'],
//   standalone: true,
//   imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
// })
// export class AdminSellersPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IonLabel, IonBadge, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonInput } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-admin-sellers',
  templateUrl: './admin-sellers.page.html',
    styleUrls: ['./admin-sellers.page.scss'],
  standalone: true,
  imports: [ RouterModule,IonBadge, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonList, IonItem, IonInput]

})
export class AdminSellersPage implements OnInit {

  sellers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSellers();
  }

  loadSellers() {
    this.http.get<any[]>(
      environment.Base_URL + '/admin/get-sellers.php',
      { withCredentials: true }
    ).subscribe(res => this.sellers = res);
  }

  updateStatus(seller_id: number, status: string) {
    this.http.post(
      environment.Base_URL + '/admin/update-seller-status.php',
      { seller_id, status },
      { withCredentials: true }
    ).subscribe(() => this.loadSellers());
  }

  logout() {
    // simple session destroy
    this.http.post(
      environment.Base_URL + '/admin/logout.php',
      { withCredentials: true }
    ).subscribe(() => location.href = '/admin-login');
  }
}