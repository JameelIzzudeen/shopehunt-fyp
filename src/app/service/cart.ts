import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
// export class Cart {
  
// }
export class CartService {


  constructor(private http: HttpClient) {}

  updateQuantity(cartId: number, quantity: number): Observable<any> {
    return this.http.post(`${environment.Base_URL}/update.php`, {
      cart_id: cartId,
      quantity: quantity
    });
  }

}
