import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonItem,IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonIcon} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-seller',
  
  templateUrl: './dashboard-seller.page.html',
  styleUrls: ['./dashboard-seller.page.scss'],
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
    IonFooter,
    IonIcon
  ],
})

export class DashboardSellerPage implements OnInit {

  environment = environment;

  userId: string | null = null; //maybe want to change it to number
  user: any = {};
  store: any[] = [];

  private http = inject(HttpClient);
  public router = inject(Router);

  // constructor(
  //   private http: HttpClient,
  //   public router: Router
  // ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');

    if (this.userId) {
      this.getUserData(this.userId);
    }
  }

  getUserData(user_id: string){
    this.http.post<any>(
      `${environment.Base_URL}/seller.php`,
      {
        // user_id: this.userId
        user_id
      }
    ).subscribe( res=> {
      console.log(res);
      if (res.status === 'success') {
        this.user = res.data;
        this.store = res.store;
      }
      else{
        alert(res.message);
      }
    })
  }

}