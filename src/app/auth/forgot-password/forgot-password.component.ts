import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';
//import { validate, clean, format } from 'rut.js';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AccountService } from '../../shared/services/account.service';
const Swal = require('sweetalert2');

/*export interface User {
  uid: string;
  token?: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}*/

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [AccountService, AuthService]
})
export class ForgotPasswordComponent implements OnInit {

  public show: boolean = false;
  public recoverForm: FormGroup;
  //public errorMessage: any;
  //public userData: any;
  //public user: firebase.User;
  public showLoader: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(
      public _authSrv: AuthService,
      private fb: FormBuilder, 
      private _router: Router,
      private _accountSrv: AccountService,
      public toster: ToastrService) {
      this.recoverForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]]
      });
  }

  ngOnInit() {
  }

  showPassword() {
    this.show = !this.show;
  }

    
  forgetPassword(){
    if (this.recoverForm.valid){
      this.showLoader = true;
      let email: string = (this.recoverForm.controls.email.value) ? this.recoverForm.controls.email.value.toLowerCase() : '';
      this.subscription.add(this._accountSrv.forgotPassword(email).subscribe(
        response => {
            //this.snack.open(this._i18n.getKeyWithParameters('sign-in.forgot_request', { email : response.email}), 'X', { panelClass: ['success'], verticalPosition: 'top', duration: ConstantService.snackDuration });
            this.toster.success('Enviamos un correo a '+email+'. Ingresa a tu correo y sigue las instrucciones para continuar con la recuperación de la contraseña');
            setTimeout (() => {
              this._router.navigateByUrl('auth/login');
            }, 4000);
        },
        error =>    {
            Swal.fire({
              buttonsStyling: false,
              reverseButtons: true,
              customClass: {
                confirmButton: "btn btn-pill btn-primary",
                cancelButton: "btn btn-pill btn-danger"
              },
              icon: 'warning',
              title: 'Warning',
              text: error.error.error.message,
              showConfirmButton: true,
            });
            //this.toster.error(error.error.error.message);
            this.showLoader = false;
        },
      ));
    }
  }

}
