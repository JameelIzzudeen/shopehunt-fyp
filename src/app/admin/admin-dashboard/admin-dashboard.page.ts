// import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonInput } from '@ionic/angular/standalone';
import Chart from 'chart.js/auto';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
  standalone: true,

  imports: [RouterModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonList, IonItem, IonInput]

})
export class AdminDashboardPage implements OnInit {

  stats: any = {};

  constructor(private http: HttpClient,
  public router: Router,

  ) {}

  ngOnInit() {
    this.http.get<any>(
      // environment.Base_URL + '/admin/dashboard-stats.php',
      `${environment.Base_URL}/admin/dashboard-stats.php`,
      { withCredentials: true }
    ).subscribe(res => {
      console.log("Dashboard stats response:", res);
      if (res.status === 'success') {
        this.stats = res.data;
        this.loadCharts();
        console.log("Stats loaded", this.stats);
      }
      else if (res.status === 'unauthorized') {
        console.log("Unauthorized access, redirecting to login");
        this.router.navigate(['admin-login']);
      }
      else{
        console.log("Failed to load stats", res.message);
      }
    });
  }

  loadCharts() {
    /* Seller Status Pie */
    new Chart('sellerChart', {
      type: 'pie',
      data: {
        labels: Object.keys(this.stats.seller_status),
        datasets: [{
          data: Object.values(this.stats.seller_status),
          backgroundColor: ['#facc15', '#22c55e', '#ef4444']
        }]
      }
    });

    /* Stock by Category Bar */
    new Chart('categoryChart', {
      type: 'bar',
      data: {
        labels: this.stats.stock_by_category.map((c: any) => c.category_name),
        datasets: [{
          label: 'Stock Variety Count',
          data: this.stats.stock_by_category.map((c: any) => c.total),
          backgroundColor: '#3b82f6'
        }]
      }
    });
  }

  logout() {
    // simple session destroy
    this.http.post(environment.Base_URL + '/admin/logout.php',
    {},
    { withCredentials: true }
    ).subscribe(res => {
      console.log("Logout response:", res);
      location.href = '/admin-login';
    });
  }
}
