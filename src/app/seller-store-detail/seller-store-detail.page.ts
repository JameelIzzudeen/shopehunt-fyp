import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-seller-store-detail',
  templateUrl: './seller-store-detail.page.html',
  styleUrls: ['./seller-store-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SellerStoreDetailPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
