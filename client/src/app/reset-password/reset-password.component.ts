import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{
  urlParams: any = {};
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;


  constructor(
    private route: ActivatedRoute,
    public accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({

      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }


  resetPassword() {

    const password = this.registerForm.value
    console.log(password)
    console.log(password.password)
    console.log(password.confirmPassword)
    this.urlParams.password = password.password
    this.urlParams.confirmPassword = password.confirmPassword
    this.urlParams.token = this.route.snapshot.queryParamMap.get('token');
    this.urlParams.userid = this.route.snapshot.queryParamMap.get('userid');
    console.log(this.urlParams)
    this.accountService.resetPassword(this.urlParams).subscribe(
      () => {
        console.log('success');
        this.toastr.success('The Password has been reset');
        this.router.navigateByUrl('/')
      },
      (error) => {
        console.log(error);
        this.toastr.error('Unable to reset password');
      }
    );
  }

}
