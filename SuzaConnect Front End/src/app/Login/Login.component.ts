import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  loginSuccessful = false; // Flag to control successful login message display
  loginFailed = false; // Flag to control login failure message display

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.login(this.credentials).subscribe(
      response => {
        console.log('Login response', response);
        if (response && response.message === 'Login successful') {
          this.loginSuccessful = true; // Set loginSuccessful to true upon successful login
          setTimeout(() => {
            this.router.navigate(['/dashboard']); // Redirect to dashboard after 3 seconds
          }, 3000);
        } else {
          console.error('Unexpected response from server');
          this.loginFailed = true; // Display login failure message
        }
      },
      error => {
        console.error('Error logging in', error);
        if (error.status === 401) {
          console.log('Invalid email or password');
          this.loginFailed = true; // Display login failure message
        } else {
          console.error('An error occurred while logging in');
          // Handle other errors
        }
      }
    );
  }
}
