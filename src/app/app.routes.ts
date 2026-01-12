import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./public/pages/home/home.page').then((m) => m.HomePage),
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then((m) => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.page').then( m => m.RegisterPage)
  },
  // {
  //   path: 'dashboard',
  //   loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage)
  // },
  {
    path: 'dashboard-customer',
    loadComponent: () => import('./customer/pages/dashboard/dashboard-customer.page').then( m => m.DashboardCustomerPage)
  },
  {
    path: 'store-detail/:id',
    loadComponent: () => import('./customer/pages/store-detail/store-detail.page').then( m => m.StoreDetailPage)
  },
  {
    path: 'navigate',
    loadComponent: () => import('./shared/navigate/navigate.page').then( m => m.NavigatePage)
  },
  {
    path: 'dashboard-seller',
    loadComponent: () => import('./seller/pages/dashboard/dashboard-seller.page').then( m => m.DashboardSellerPage)
  },
  // {
  //   path: 'seller-store-detail',
  //   loadComponent: () => import('./seller-store-detail/seller-store-detail.page').then( m => m.SellerStoreDetailPage)
  // },
  {
    path: 'category-detail/:id',
    loadComponent: () => import('./customer/pages/category-detail/category-detail.page').then( m => m.CategoryDetailPage)
  },
  {
    path: 'stock-detail/:id',
    loadComponent: () => import('./customer/pages/stock-detail/stock-detail.page').then( m => m.StockDetailPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./shared/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'cart',
    loadComponent: () => import('./customer/pages/cart/cart.page').then( m => m.CartPage)
  },
  {
    path: 'recommend-store',
    loadComponent: () => import('./customer/pages/recommend-store/recommend-store.page').then( m => m.RecommendStorePage)
  },
  {
    path: 'store-detail-seller/:id',
    loadComponent: () => import('./seller/pages/store-detail-seller/store-detail-seller.page').then( m => m.StoreDetailSellerPage)
  },
  {
    path: 'admin-login',
    loadComponent: () => import('./admin/admin-login/admin-login.page').then( m => m.AdminLoginPage)
  },
  {
    path: 'admin-dashboard',
    loadComponent: () => import('./admin/admin-dashboard/admin-dashboard.page').then( m => m.AdminDashboardPage)
  },
  {
    path: 'admin-sellers',
    loadComponent: () => import('./admin/admin-sellers/admin-sellers.page').then( m => m.AdminSellersPage)
  },
  {
    path: 'admin-categories',
    loadComponent: () => import('./admin/admin-categories/admin-categories.page').then( m => m.AdminCategoriesPage)
  },
  {
    path: 'admin-users',
    loadComponent: () => import('./admin/admin-users/admin-users.page').then( m => m.AdminUsersPage)
  },  {
    path: 'user-auth',
    loadComponent: () => import('./auth/user-auth/user-auth.page').then( m => m.UserAuthPage)
  },
  {
    path: 'register-seller',
    loadComponent: () => import('./auth/register-seller/register-seller.page').then( m => m.RegisterSellerPage)
  },


    // ===== ADMIN ROUTES =====
  // {
  //   path: 'admin',
  //   children: [
  //     {
  //       path: 'login',
  //       loadChildren: () =>
  //         import('./admin/admin-login/admin-login.page')
  //           .then(m => m.AdminLoginPage)
  //     },
  //     {
  //       path: 'dashboard',
  //       loadChildren: () =>
  //         import('./admin/admin-dashboard/admin-dashboard.page')
  //           .then(m => m.AdminDashboardPage)
  //     }
  //   ]
  // },

  // fallback
  // {
  //   path: '**',
  //   redirectTo: 'login'
  // }

];
