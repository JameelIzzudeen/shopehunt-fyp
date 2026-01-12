import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonInput, IonItem, IonBackButton } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  // imports: [RouterModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
  imports: [
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonInput,
    IonItem,
    FormsModule, 
    IonBackButton
  ],
})
// export class LoginPage implements OnInit {
export class LoginPage implements OnInit {

  loginData = {
    username: '',
    password: ''
  }
  userId : string | null = null;
  role : string | null = null;

  private http = inject(HttpClient);
  private router = inject(Router);

  // constructor(
  //   private http: HttpClient,
  //   private router: Router
  // ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    this.role = localStorage.getItem('role');

    if (this.userId && this.role) {
      if (this.role === 'customer') {
        this.router.navigate(['/dashboard-customer']);
      } else if (this.role === 'seller') {
        this.router.navigate(['/dashboard-seller']);
      }
    }
  }


  login() {
    console.log('LOGIN DATA:', this.loginData);

    this.http.post<any>(
      `${environment.Base_URL}/auth/login.php`,
      this.loginData
    ).subscribe({
      next: (res) => {
        console.log('SERVER RESPONSE:', res);

        if (res.status === 'success') {
          localStorage.setItem('user_id', res.user_id);
          localStorage.setItem('role', res.role);

          if (res.role === 'customer') {
            this.router.navigate(['/dashboard-customer']);
          } else if (res.role === 'seller') {
            this.router.navigate(['/dashboard-seller']);
          }
        } else {
          alert(res.message);
        }
      },
      error: (err) => {
        console.error('HTTP ERROR:', err);
        alert('Cannot connect to server');
      }
    });
  }


}
