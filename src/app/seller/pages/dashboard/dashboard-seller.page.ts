import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonRefresher, IonRefresherContent, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonItem,IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonIcon} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-seller',
  
  templateUrl: './dashboard-seller.page.html',
  styleUrls: ['./dashboard-seller.page.scss'],
  standalone: true,
  imports: [
    IonRefresher,
    IonRefresherContent,
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
    if (!this.userId) {
      alert('Unauthorized access.');
      this.router.navigate(['/login']);
      return;
    }
    this.getUserData(this.userId);
  }

  getUserData(user_id: string){
    this.http.post<any>(
      `${environment.Base_URL}/dashboard/seller.php`,
      {
        user_id
      }
    ).subscribe( res=> {
      console.log(res);
      if (res.status === 'success') {
        this.user = res.data;
        this.store = res.store;
      } else if (res.status === 'unauthorized') {
        alert('Unauthorized access.');
        this.router.navigate(['/login']);
      } else{
        alert(res.message);
      }
    })
  }

  doRefresh(event: any) {
    console.log('Begin async refresh');

    // Call your existing function to reload store data
    this.getUserData(this.userId!);

    // Simulate a short delay if needed
    setTimeout(() => {
      console.log('Async refresh complete');
      event.target.complete(); // important to stop the spinner
    }, 1000);
  }
}