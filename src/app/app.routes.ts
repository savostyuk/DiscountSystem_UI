import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './components/layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './components/layouts/login-layout/login-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { VendorsComponent } from './pages/moderator/vendors/vendors.component';
import { CategoriesComponent } from './pages/moderator/categories/categories.component';
import { ModeratorComponent } from './pages/moderator/moderator.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent,
        children: [
          {path: '', redirectTo: '/discounts', pathMatch: 'full'},
          {path: 'discounts', component: DiscountsComponent},
          {path: 'favorites', component: FavoritesComponent},
          {path: 'profile', component: UserProfileComponent},
          {path: 'moderator',
            data: {
                role: 'moderator',
            },
            component: ModeratorComponent,
            children: [
                {path: '', redirectTo: '/moderator/vendors', pathMatch: 'full'},
                {path: 'vendors', component: VendorsComponent},
                {path: 'categories_tags', component: CategoriesComponent}
            ]
          },
          {
            path: 'admin',
            data: {
              role: 'administrator',
            },
            component: AdminComponent,
            children: [
              {path: '', redirectTo: '/admin/users', pathMatch: 'full'},
              {path: 'users', component: UsersComponent},
              {path: 'event-history', component: UsersComponent},
            ],
          }
        ]
      },
      {
        path: '',
        component: LoginLayoutComponent,
        children: [
          {path: 'login', component: LoginComponent},
        ]
      },
      {path: '**', component: NotFoundComponent}, 
];
