import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
  }
  
  username: string = '';
  password: string = '';
  loginFailed: boolean = false;

  clearFields() {
    this.username = '';
    this.password = '';
    this.loginFailed = false;
  }

  login() {
    // Check if username and password are correct
    if ((this.username === 'Prashant Fawade' && this.password === 'Prashant@1234') || (this.username === 'john' && this.password === 'abc123') || (this.username === 'james' && this.password === 'xyz567')) {
      // Redirect to the homepage
      this.router.navigate(['/home']);
    } else {
      this.loginFailed = true;
    }
  }

  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
 }

}
