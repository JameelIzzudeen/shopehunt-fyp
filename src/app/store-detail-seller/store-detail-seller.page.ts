// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

// @Component({
//   selector: 'app-store-detail-seller',
//   templateUrl: './store-detail-seller.page.html',
//   styleUrls: ['./store-detail-seller.page.scss'],
//   standalone: true,
//   imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
// })

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonItem,IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonList, IonModal, IonButtons, IonLabel} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-store-detail-seller',
  
  templateUrl: './store-detail-seller.page.html',
  styleUrls: ['./store-detail-seller.page.scss'],
  standalone: true,
  imports: [
    IonImg,
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonInput,
    IonItem,
    IonList,
    IonLabel,
    IonModal,
    FormsModule,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonBackButton,
  ],
})

export class StoreDetailSellerPage implements OnInit {

  environment = environment;

  storeId !: number;
  userId: string | null = null; //maybe want to change it to number
  store: any[] = [];

  latitude!: number;
  longitude!: number;

  isEditing: boolean = false;

  editingStockId: number | null = null;
  editingStoreId: number | null = null;

  stockList: any[] = [];
  categoryList: any[] = [];
  filteredStocks: any[] = [];
  filteredCategories: any[] = [];

  showAddStock = false;

  newStock = {
    stock_id: null,
    stock_name: '',
    category_id: null,
    category_name: '',
    price: null,
    quantity: null,
    description: ''
  };

  // selectedImage!: File;
  selectedStoreImage!: File;
  selectedStockImage!: File;



  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');

    if (this.userId) {
      this.storeId = Number(this.route.snapshot.paramMap.get('id'));
      this.getStoreDetail();
      this.loadStockList();
      this.loadCategoryList();
    }
  }

  getStoreDetail(){
    this.http.post<any>(
      `${environment.Base_URL}/store-detail.php`,
      {
        store_id : this.storeId
      }
    ).subscribe( res=> {
      console.log(res);

      if (res.status === 'success') {
        this.store = res.store;
      } else {
        alert(res.message);
      }
    });
  }

  loadStockList() {
    this.http.get<any>(`${environment.Base_URL}/get-stock.php`)
      .subscribe(res => {
        if (res.status === 'success') {
          console.log("stock list here: ",res);
          this.stockList = res.data;
        }
      });
  }

    loadCategoryList() {
    this.http.get<any>(`${environment.Base_URL}/get-category.php`)
      .subscribe(res => {
        if (res.status === 'success') {
          console.log("category list here: ",res);
          this.categoryList = res.data;
        }
      });
  }

  navigateToStore() {
    this.navCtrl.navigateForward('/navigate', {
      queryParams: {
        lat: this.store[0].latitude,
        lng: this.store[0].longitude,
        name: this.store[0].store_name
      }
    });
  }

  toggleEdit(stock: any) {
    if (this.editingStockId && this.editingStockId !== stock.stock_id) {
      alert('Please save current stock before editing another.');
      return;
    }

    if (this.editingStockId === stock.stock_id) {
      // 🔹 SAVE logic here (call backend if needed)
      // this.uploadStockImage(stock.stock_id, this.storeId);
      
      
      // this.editingStockId = null;
      console.log('Saving data:', stock);
      this.http.post<any>(
        `${environment.Base_URL}/update-store-detail-seller.php`,
        {
          user_id: this.userId,
          store_id: stock.store_id,
          stock_id: stock.stock_id,
          stock_name: stock.stock_name,
          category_id: stock.category_id,
          price: stock.price,
          quantity: stock.quantity,
          description: stock.description,
          // username: this.userData.username,
          // first_name: this.userData.first_name,
          // last_name: this.userData.last_name,
          // email: this.userData.email,
          // phone: this.userData.phone
        }
      ).subscribe( res => {
        console.log(res);
        if (res.status === 'success') {
          const finalStockId = res.new_stock_id ?? stock.stock_id;

          // ✅ NOW upload image
          console.log("final stock id", finalStockId)
          this.uploadStockImage(finalStockId, this.storeId);
          alert('Profile updated successfully.');
          this.editingStockId = null;
        }
        else{
          alert(res.message);
        }
      });
    } else {

    this.editingStockId = stock.stock_id;
    }
  }

    toggleStoreEdit(store: any) {
    if (this.editingStoreId === store.store_id) {
      // 🔹 SAVE logic here (call backend if needed)
      this.uploadStoreImage(store.store_id);
      this.editingStoreId = null;
      console.log('Saving data:', store);
      this.http.post<any>(
        `${environment.Base_URL}/update-store-detail-seller.php`,
        {
          user_id: this.userId,
          store_id: store.store_id,
          store_name: store.store_name,
          latitude: store.latitude,
          longitude: store.longitude,
          // username: this.userData.username,
          // first_name: this.userData.first_name,
          // last_name: this.userData.last_name,
          // email: this.userData.email,
          // phone: this.userData.phone
        }
      ).subscribe( res => {
        console.log(res);
        if (res.status === 'success') {
          alert('Store Profile updated successfully.');
          this.editingStoreId = null;
        }
        else{
          alert(res.message);
        }
      });
    } else {

    this.editingStoreId = store.store_id;
    }
  }


  filterStocks(event: any) {
    const val = event.target.value?.toLowerCase() || '';

    this.filteredStocks = this.stockList.filter(stock =>
      stock.stock_name.toLowerCase().includes(val)
    );
  }

  selectStock(stock: any, storeStock: any) {
    // storeStock.stock_id = stock.stock_id;
    storeStock.stock_name = stock.stock_name;
    this.filteredStocks = [];
  }
  
  ////////////////////////////////////////////////////last save
  selectNewStock(stock: any) {
    this.newStock.stock_id = stock.stock_id;
    this.newStock.stock_name = stock.stock_name;
    this.newStock.category_id = stock.category_id;
    this.newStock.category_name = stock.category_name;
    this.filteredStocks = [];
  }
  selectNewCategory(category: any) {
    this.newStock.category_id = category.category_id;
    this.newStock.category_name = category.category_name;
    this.filteredCategories = [];
  }
 
  //for category dropdown in add stock modal
  filterCategories(event: any) {
    const val = event.target.value?.toLowerCase() || '';

    this.filteredCategories = this.categoryList.filter(category =>
      category.category_name.toLowerCase().includes(val)
    );
  }
    selectCategory(category: any, storeStock: any) {
    // storeStock.stock_id = stock.stock_id;
    storeStock.category_name = category.category_name;
    this.filteredCategories = [];
  }

  addStock() {
    console.log('debug msg:', this.newStock.category_id, this.newStock.category_name);
    if (!this.newStock.price || !this.newStock.quantity) {
      alert('Please complete all required fields');
      return;
    }

    this.http.post<any>(
      `${environment.Base_URL}/add-store-stock.php`,
      {
        
        user_id: this.userId,
        store_id: this.storeId,
        stock_id: this.newStock.stock_id,
        stock_name: this.newStock.stock_name,
        category_id: this.newStock.category_id,
        category_name: this.newStock.category_name,
        price: this.newStock.price,
        quantity: this.newStock.quantity,
        description: this.newStock.description
      }
    ).subscribe(res => {
      if (res.status === 'success') {
        alert('Stock added successfully');
        this.uploadStockImage(res.stock_id, this.storeId);

        this.showAddStock = false;
        this.newStock = {
          stock_id: null,
          stock_name: '',
          category_id: null,
          category_name: '',
          price: null,
          quantity: null,
          description: ''
        };

        this.getStoreDetail(); // 🔄 refresh list
      } else {
        alert(res.message);
      }
    });
  }

  // onImageSelected(event: any) {
  //   this.selectedImage = event.target.files[0];
  // }

  onStoreImageSelected(event: any) {
    this.selectedStoreImage = event.target.files[0];
  }

  onStockImageSelected(event: any) {
    this.selectedStockImage = event.target.files[0];
  }

  uploadStoreImage(storeId: number) {
    if (!this.selectedStoreImage) return;

    const formData = new FormData();
    formData.append('image', this.selectedStoreImage);
    formData.append('store_id', storeId.toString());

    this.http.post(
      `${environment.Base_URL}/upload-store-image.php`,
      formData
    ).subscribe((res: any) => {
      if (res.success) {
        this.store[0].image = res.image;
      }
    });
  }

/////////////////////////////////////////last jadi



  uploadStockImage(stockId: number, storeId: number) {
    if (!this.selectedStockImage) return;

    const formData = new FormData();
    formData.append('image', this.selectedStockImage);
    formData.append('store_id', storeId.toString());
    formData.append('stock_id', stockId.toString());

    this.http.post(
      `${environment.Base_URL}/upload-stock-image.php`,
      formData
    ).subscribe((res: any) => {
      if (res.success) {
        this.store[0].image = res.image;
      }
    });
  }

  deleteStock(stockId: number) {
    if (!confirm('Are you sure you want to delete this stock?')) {
      return;
    }

    this.http.post<any>(
      `${environment.Base_URL}/delete-store-stock.php`,
      {
        stock_id: stockId,
        store_id: this.storeId
      }
    ).subscribe(res => {
      if (res.status === 'success') {
        alert('Stock deleted successfully');
        this.getStoreDetail(); // 🔄 refresh list
      } else {
        alert(res.message);
      }
    });
  }


}
