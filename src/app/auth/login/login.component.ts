import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { validate, clean, format } from 'rut.js';
import { Router } from '@angular/router';
import { Session } from 'src/app/shared/model/session';
import { ToastrService } from 'ngx-toastr';
const Swal = require('sweetalert2');

export interface User {
  uid: string;
  token?: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  public show: boolean = false;
  public loginForm: FormGroup;
  public errorMessage: any;
  public userData: any;
  public showLoader: boolean = false;
  public loadingButton: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(
      public _authSrv: AuthService,
      private fb: FormBuilder, 
      private _router: Router,
      public toster: ToastrService) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]]
      });
  }

  ngOnInit() {
  }

  showPassword() {
    this.show = !this.show;
  }

  // Simple Login
  login() {
    //this.authService.SignIn(this.loginForm.value['email'], this.loginForm.value['password']);
    
    
    
  }
  
  onFocusRut(){
        this.loginForm.controls.email.markAsPristine();
        if (this.loginForm.controls.email.value != ''){
            this.loginForm.controls.email.setValue(clean(this.loginForm.controls.email.value));
        }
    }

    
    onBlurRut() {
        if (this.loginForm.controls.email.value != '') {
            if (this.loginForm.controls.email.value.length > 3 && validate(this.loginForm.controls.email.value)) {
            this.loginForm.controls.email.setErrors(null);
            this.loginForm.controls.email.setValue(format(this.loginForm.controls.email.value));
            
            } else {
            this.loginForm.controls.email.setErrors({'incorrect': true});
            }
            this.loginForm.controls.email.markAsDirty();
        }
    }
    
    doLogin(){
        this.loadingButton = true;
        this.loginForm.disable();
        let credentials = {
            email : (this.loginForm.controls.email.value) ? this.loginForm.controls.email.value.toLowerCase() : '',
            password: this.loginForm.controls.password.value
        }
        this.subscription.add(this._authSrv.signIn(credentials).subscribe(
            response => {
                let profile: Session = JSON.parse(localStorage.getItem('profile'));
                console.log(profile);
                this._router.navigate(['/dashboard/online-course']);
                this.loadingButton = false;
            },
            response =>    { 
                this.loginForm.enable();
                let error = response.error.error.message.toString().split("|");
                if (error.length == 0){
                    /*Swal.fire({
                      customClass: {
                        confirmButton: "btn btn-info btn-pill",
                        cancelButton: "btn btn-danger btn-pill"
                      },
                      type: 'Error',
                      title: 'Warning',
                      text: error,
                      showConfirmButton: true,
                    });*/
                    console.log(error);
                    this.loadingButton = false;
                } else {
                    Swal.fire({
                      buttonsStyling: false,
                      reverseButtons: true,
                      customClass: {
                        confirmButton: "btn btn-pill btn-primary",
                        cancelButton: "btn btn-pill btn-danger"
                      },
                      icon: 'warning',
                      title: 'Warning',
                      text: error[0],
                      showConfirmButton: true,
                    });
                    this.loadingButton = false;
                    console.log(error[0]);
                }
            })
        );
    }

}
