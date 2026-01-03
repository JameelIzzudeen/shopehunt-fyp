import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonItem } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  // imports: [RouterModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
  imports: [
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonInput,
    IonItem,
    FormsModule, 
    IonBackButton,
    IonButtons,
  ],
})

export class RegisterPage implements OnInit {

  registerData = {
    username: '',
    fname: '',
    lname: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: ''
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register() {
    console.log('REGISTER DATA:', this.registerData);

    this.http.post<any>(
      `${environment.Base_URL}/register.php`,
      this.registerData
    ).subscribe({
      next: (res) => {
        console.log('SERVER RESPONSE:', res);

        if (res.status === 'success') {
          // localStorage.setItem('user_id', res.user_id);
          // localStorage.setItem('role', res.role);
          alert(res.message);
          this.router.navigate(['/login']);

          // if (res.role === 'customer') {
          //   this.router.navigate(['/dashboard-customer']);
          // } else if (res.role === 'seller') {
          //   this.router.navigate(['/dashboard-seller']);
          // }
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
