import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isRegister: boolean = false;
  isOTP: boolean = false;
  otpSent: boolean = false;
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  otp: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.isOTP) {
      // Regular login or registration
      if (this.isRegister) {
        // Call your registration API
        this.authService.register({ email: this.email, password: this.password, confirmPassword: this.confirmPassword })
          .subscribe(
            response => {
              // Handle successful registration
              this.otpSent = true;
            },
            error => {
              // Handle registration error
              this.errorMessage = error.message;
            }
          );
      } else {
        // Call your login API
        this.authService.login({ email: this.email, password: this.password })
          .subscribe(
            response => {
              // Handle successful login
              this.otpSent = true;
            },
            error => {
              // Handle login error
              this.errorMessage = error.message;
            }
          );
      }
    }
  }

  verifyOTP() {
    // Call your API to verify OTP
    this.authService.verifyOTP({ email: this.email, otp: this.otp })
      .subscribe(
        response => {
          // Handle successful OTP verification
        },
        error => {
          // Handle OTP verification error
          this.errorMessage = error.message;
        }
      );
  }

  toggleMode() {
    // Reset the form and toggle between login and register modes
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.otp = '';
    this.errorMessage = '';
    this.otpSent = false;
    this.isOTP = false;
    this.isRegister = !this.isRegister;
  }
}