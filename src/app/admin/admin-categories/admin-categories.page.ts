// import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IonImg, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonInput } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.page.html',
  styleUrls: ['./admin-categories.page.scss'],
  standalone: true,
  imports: [IonImg, RouterModule, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonList, IonItem, IonInput]
})
export class AdminCategoriesPage implements OnInit {

  environment = environment;


  categories: any[] = [];
  newCategory = '';
  selectedCategoryImage!: File;


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.http.get<any>(
      environment.Base_URL + '/admin/get-categories.php',
      { withCredentials: true }
    ).subscribe(res => {
      console.log("Categories response:", res);
      this.categories = res.data});
  }

  addCategory() {
    if (!this.newCategory.trim()) return;

    this.http.post<any>(
      // environment.Base_URL + '/admin/add-category.php',
      `${environment.Base_URL}/admin/add-category.php`,
      { category_name: this.newCategory },
      { withCredentials: true }
    ).subscribe(res => {
      if (res.status === 'success') {
        alert(res.message);
        this.uploadCategoryImage(res.category_id);
        this.newCategory = '';
        this.loadCategories();
      }
      else {
        alert('Error: ' + res.message);
      }
    });
  }

  deleteCategory(id: number) {
    if (!confirm('Delete this category?')) return;

    this.http.post(
      environment.Base_URL + '/admin/delete-category.php',
      { category_id: id },
      { withCredentials: true }
    ).subscribe(() => this.loadCategories());
  }

  logout() {
    // simple session destroy
    // fetch(environment.Base_URL + '/admin/logout.php')
    //   .then(() => location.href = '/admin-login');
    this.http.post(
      environment.Base_URL + '/admin/logout.php',
      { withCredentials: true }
    ).subscribe(() => location.href = '/admin-login');
  }

  onCategoryImageSelected(event: any) {
    this.selectedCategoryImage = event.target.files[0];
  }

  uploadCategoryImage(categoryId: number) {
    if (!this.selectedCategoryImage) return;

    const formData = new FormData();
    formData.append('image', this.selectedCategoryImage);
    formData.append('category_id', categoryId.toString());

    this.http.post(
      `${environment.Base_URL}/admin/upload-category-image.php`,
      formData,
      { withCredentials: true }
    ).subscribe((res: any) => {
      if (res.success) {
        console.log('Image uploaded successfully');
        this.categories[0].image = res.image;
      }
      else{
        console.log('Image upload failed: ' + res.message);
      }
    });
  }

}