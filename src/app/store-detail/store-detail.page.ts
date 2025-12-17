// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

// @Component({
//   selector: 'app-store-detail',
//   templateUrl: './store-detail.page.html',
//   styleUrls: ['./store-detail.page.scss'],
//   standalone: true,
//   imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
// })

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonItem,IonCard, IonCardContent, IonCardTitle, IonCardHeader} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-store-detail',
  
  templateUrl: './store-detail.page.html',
  styleUrls: ['./store-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
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


export class StoreDetailPage implements OnInit {

  storeId !: number;
  store: any[] = [];

  latitude!: number;
  longitude!: number;


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.storeId = Number(this.route.snapshot.paramMap.get('id'));
    this.getStoreDetail();
  }

  getStoreDetail(){
    this.http.post<any>(
      `${environment.Base_URL}/store-detail.php`,
      {
        store_id : this.storeId
      }
    ).subscribe( res=> {
      console.log(res);

      if (res.status === 'success') {
        this.store = res.store;
      } else {
        alert(res.message);
      }
    });
  }

  navigateToStore() {
    this.navCtrl.navigateForward('/navigate', {
      queryParams: {
        lat: this.store[0].latitude,
        lng: this.store[0].longitude,
        name: this.store[0].store_name
      }
    });
  }

}
