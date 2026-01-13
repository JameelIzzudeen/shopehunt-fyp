import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonRefresher, IonRefresherContent, IonAvatar,IonLabel, IonContent, IonHeader, IonFooter, IonTitle, IonToolbar, IonButton, IonInput, IonItem,IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonCheckbox, IonIcon} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';



import { environment } from 'src/environments/environment';
import { CartService } from '../../../core/service/cart';

@Component({
  selector: 'app-cart',

  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [
    IonRefresher,
    IonRefresherContent, 
    CommonModule, 
    RouterModule,
    IonHeader, IonFooter,
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
    IonCheckbox,
    IonIcon,
    IonLabel,
    IonAvatar
  ],
})

export class CartPage implements OnInit {

  environment = environment; // ✅ expose to HTML


  userId : string | null = null;
  cartData: any[] = [];

  private http = inject(HttpClient);
  private cartService = inject(CartService);
  public router = inject(Router);

  // constructor(
  //   private http: HttpClient,
  //   public router: Router,
  //   private cartService: CartService,

  // ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');

    if (this.userId) {
      this.getCartData();
    } else {
      alert('User ID not found, please login.');
    }
  }

  getCartData() {
    this.http.post<any>(
      `${environment.Base_URL}/cart/cart.php`,
      {
        user_id: this.userId
      }
    ).subscribe( res => {
      console.log(res);
      if (res.status === 'success') {
        // this.cartData = res.cart_data;
        this.cartData = res.cart_data.map((item: any) => ({
          ...item,
          selected: false   // ✅ frontend-only property
        }));
      }
      else if (res.status === 'unauthorized') {
        alert('Unauthorized access.');
        this.router.navigate(['/login']);
      }
      else{
        alert(res.message);
      }
    });
  }

  updateCartQuantity(cartId: number, quantity: number) {
  if (quantity < 1) return;

  this.cartService.updateQuantity(cartId, quantity)
    .subscribe({
      next: () => {
        console.log('Quantity updated');
      },
      error: err => {
        console.error('Update failed', err);
      }
    });
  }

  getSelectedItems() {
    return this.cartData.filter(c => c.selected);
  }

  goToRecommendStore() {
    const selectedItems = this.getSelectedItems();

    // if (selectedItems.length === 0) {
    //   alert('Please select at least one item');
    //   return;
    // }
    if (selectedItems.length === 0) {
      // If no items are selected, clear the stored selection
      alert('No items selected');
      return;
    }

    localStorage.setItem('selected_cart_items', JSON.stringify(selectedItems));
    this.router.navigate(['/recommend-store']);
  }

  deleteCartItem(cartId: number) {
    console.log('Deleting cart item with ID:', cartId, 'for user ID:', this.userId);
    this.http.post<any>(
      `${environment.Base_URL}/cart/delete-cart-item.php`,
      {
        user_id: this.userId,
        cart_id: cartId
      }
    ).subscribe( res => {
      console.log(res);
      if (res.status === 'success') {
        // this.cartData = res.cart_data;
        this.getCartData();
        alert(res.message);
      }
      else if (res.status === 'unauthorized') {
        alert('Unauthorized access.');
        this.router.navigate(['/login']);
      }
      else{
        alert(res.message);
      }
    });
  }

    doRefresh(event: any) {
    console.log('Begin async refresh');

    // Call existing function to reload store data
    this.ngOnInit();

    // Simulate a short delay if needed
    setTimeout(() => {
      console.log('Async refresh complete');
      event.target.complete(); // to stop the spinner
    }, 1000);
  }
}
