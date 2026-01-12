// import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

// @Component({
//   selector: 'app-admin-login',
//   templateUrl: './admin-login.page.html',
//   styleUrls: ['./admin-login.page.scss'],
//   standalone: true,
//   imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
// })
// export class AdminLoginPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonInput } from '@ionic/angular/standalone';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonList, IonItem, IonInput]
})
export class AdminLoginPage {

  username = '';
  password = '';
  error = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {
    this.http.post<any>(
      environment.Base_URL + '/admin/admin-login.php',
      { username: this.username, password: this.password },
      { withCredentials: true }
    // ).subscribe({
    //   next: () => this.router.navigate(['admin-dashboard']),
    //   error: err => this.error = err.error?.error || 'Login failed'
    // });
    ).subscribe(res =>{
      if (res.status === "success") {
        this.router.navigate(['admin-dashboard']);
      }
      console.log("Login response:", res);
    });
  }
}
