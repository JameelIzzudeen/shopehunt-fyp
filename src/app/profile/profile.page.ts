// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.page.html',
//   styleUrls: ['./profile.page.scss'],
//   standalone: true,
//   imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
// })

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonFooter, IonTitle, IonToolbar, IonButton, IonInput, IonItem,IonCard, IonCardContent, IonCardTitle, IonCardHeader,IonIcon} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-profile',

  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
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
    IonIcon
  ],
})



export class ProfilePage implements OnInit {

  userId : string | null = null;
  userData: any = {};
  isEditing: boolean = false;

  constructor(
    private http: HttpClient,
    public router: Router,
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');

    if (this.userId) {
      this.getUserData();
    } else {
      alert('User ID not found, please login.');
    }
  }

  getUserData() {
    this.http.post<any>(
      `${environment.Base_URL}/user-profile.php`,
      {
        user_id: this.userId
      }
    ).subscribe( res=> {
      console.log(res);
      if (res.status === 'success') {
        this.userData = res.userData;
      }
    });
  }

  toggleEdit() {
    if (this.isEditing) {
      // 🔹 SAVE logic here (call backend if needed)
      console.log('Saving data:', this.userData);
      this.http.post<any>(
        `${environment.Base_URL}/update-user-profile.php`,
        {
          user_id: this.userId,
          username: this.userData.username,
          first_name: this.userData.first_name,
          last_name: this.userData.last_name,
          email: this.userData.email,
          phone: this.userData.phone
        }
      ).subscribe( res => {
        console.log(res);
        if (res.status === 'success') {
          alert('Profile updated successfully.');
        }
        else{
          alert(res.message);
        }
      });
      }

    this.isEditing = !this.isEditing;
  }

  logout() {
    // Clear user session/localStorage
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_id');
    localStorage.removeItem('selected_cart_items');

    // Navigate to login page
    this.router.navigate(['/login']);
  }

}
