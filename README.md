

# 1. Project Setup

Create a new Angular project:

Bash

ng new my-auth-app
cd my-auth-app
Install necessary packages:

Bash

npm install @angular/material @angular/cdk @angular/flex-layout
npm install rxjs-compat

# 2. Create Authentication Service

Create a service:

Bash

ng generate service services/auth
Implement the service (auth.service.ts):

TypeScript

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false); 

  constructor() { }

  login() {
    // Simulate successful login
    this.isLoggedIn$.next(true); 
  }

  logout() {
    // Simulate logout
    this.isLoggedIn$.next(false); 
  }

  isLoggedIn() {
    return this.isLoggedIn$.asObservable(); 
  }
}


# 3. Create Authorization Guard

Create a guard:

Bash

ng generate guard guards/auth
Implement the guard (auth.guard.ts):

TypeScript

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLoggedIn().pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          return true; 
        } else {
          this.router.navigate(['/login']); 
          return false;
        }
      })
    );
  }
}

# 4. Create Login Component

Generate a component:

Bash

ng generate component components/login
Implement the component (login.component.ts):

TypeScript

import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login(); 
    this.router.navigate(['/']); 
  }
}


# 5. Create Protected Component

Generate a component:

Bash

ng generate component components/protected
Implement the component (protected.component.ts):

TypeScript

import { Component } from '@angular/core';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent {

}
6. Configure Routing

Update app-routing.module.ts:

TypeScript

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
7. Run the Application

Start the development server:
Bash

ng serve

# Explanation:

Authentication: The AuthService handles user login and logout. It uses a BehaviorSubject to manage the logged-in state.
Authorization: The AuthGuard checks if the user is logged in before allowing access to protected routes.
Login Component: Provides a UI for users to log in. On successful login, it calls the AuthService and redirects to the home page.
Protected Component: Represents a route that requires authentication. The AuthGuard will prevent access to this component if the user is not logged in.
Additional Considerations:

Token-based Authentication: For more secure applications, implement token-based authentication (e.g., JWT) using a backend API.
User Roles: Extend the authorization logic to handle different user roles and permissions.
UI Enhancements: Improve the user interface with features like password reset, forgot password, and registration.
This example provides a basic foundation for authentication and authorization in your Angular 19 application. You can adapt and expand it based on your specific requirements.
