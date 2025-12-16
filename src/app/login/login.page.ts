import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonItem } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';

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
    IonInput,
    IonItem,
    FormsModule, 
  ],
})
// export class LoginPage implements OnInit {
export class LoginPage {

  loginData = {
    username: '',
    password: ''
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // ngOnInit() {
  // }

  // login(){
  //   this.http.post<any>(
  //     'http://100.117.156.69/backend/login.php',
  //     this.loginData
  //   ).subscribe(res => {

  //     if (res.status == 'success'){
  //       localStorage.setItem('user_id', res.user_id);
  //       localStorage.setItem('role', res.role);

  //       if (res.role === 'customer') {
  //         this.router.navigate(['/dashboard-customer'])
  //       }
  //     }
  //     else{
  //       alert(res.message);
  //     }

  //   })
  // }

  login() {
    console.log('LOGIN DATA:', this.loginData);

    this.http.post<any>(
      'https://sequence.taile5772e.ts.net/backend/login.php',
      this.loginData
    ).subscribe({
      next: (res) => {
        console.log('SERVER RESPONSE:', res);

        if (res.status === 'success') {
          localStorage.setItem('user_id', res.user_id);
          localStorage.setItem('role', res.role);

          if (res.role === 'customer') {
            this.router.navigate(['/dashboard-customer']);
          } //else if (res.role === 'seller') {
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
