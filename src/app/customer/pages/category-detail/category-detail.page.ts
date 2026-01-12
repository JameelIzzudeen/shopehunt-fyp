import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonItem,IonCard, IonCardContent, IonCardTitle, IonCardHeader} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';



import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-detail',
  
  templateUrl: './category-detail.page.html',
  styleUrls: ['./category-detail.page.scss'],
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
    IonButtons,
    IonBackButton,
  ],
})


export class CategoryDetailPage implements OnInit {
  environment = environment; // ✅ expose to HTML

  categoryId !: number;
  category: any[] = [];

  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // constructor(
  //   private route: ActivatedRoute,
  //   private http: HttpClient,
  //   private router: Router,
  // ) { }

  ngOnInit() {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.getCategoryDetail();
  }

  getCategoryDetail() {
    this.http.post<any>(
      `${environment.Base_URL}/category/category-detail.php`,
      {
        category_id : this.categoryId
      }
    ).subscribe( res=> {
      console.log(res);
      if (res.status === 'success') {
        this.category = res.category;
      } else {
        alert(res.message);
      }
    });
  }

}
