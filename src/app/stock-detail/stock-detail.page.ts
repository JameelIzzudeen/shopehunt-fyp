// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

// @Component({
//   selector: 'app-stock-detail',
//   templateUrl: './stock-detail.page.html',
//   styleUrls: ['./stock-detail.page.scss'],
//   standalone: true,
//   imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
// })

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

// @Component({
//   selector: 'app-category-detail',
//   templateUrl: './category-detail.page.html',
//   styleUrls: ['./category-detail.page.scss'],
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

@Component({
  selector: 'app-stock-detail',
  
  templateUrl: './stock-detail.page.html',
  styleUrls: ['./stock-detail.page.scss'],
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

export class StockDetailPage implements OnInit {

  environment = environment;

  stockId !: number;
  stock: any[] = [];
  max_price !: number;
  min_price !: number;
  prices : any[] = [];
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    this.stockId = Number(this.route.snapshot.paramMap.get('id'));
    this.getStockDetail();
  }

  getStockDetail() {
    this.http.post<any>(
      `${environment.Base_URL}/stock-detail.php`,
      {
        stock_id : this.stockId
      }
    ).subscribe( res=> {
      console.log(res);
      if (res.status === 'success') {
        this.stock = res.stock;
        // this.prices = this.stock.map((item => Number(item.price)));
        // this.max_price = Math.max(...this.prices);
        // this.min_price = Math.min(...this.prices);
      } else {
        alert(res.message);
      }
    });
  }

  addToCart(stockId: number, quantity: number) {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      alert('Please log in to add items to your cart.');
      this.router.navigate(['/login']);
      return;
    }

    this.http.post<any>(
      `${environment.Base_URL}/add-to-cart.php`,
      {
        user_id: userId,
        stock_id: stockId,
        quantity: quantity
      }
    ).subscribe(res => {
      if (res.status === 'success') {
        alert('Item added to cart successfully!');
      }
      else {
        alert(res.message);
      }
    });
  }

}
