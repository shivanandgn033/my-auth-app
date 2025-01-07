import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login(); 
    this.router.navigate(['/protected']); 
  }
  ngOnInit()
  {
    //this.authService.login(); 
    //this.router.navigate(['/protected']); 
  }


}
