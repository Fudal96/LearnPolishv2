import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{

  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService) {}


  ngOnInit(): void {

  }


  forgotPassword() {
    this.accountService.forgotPassword(this.model).subscribe({
      next: () => {
        console.log(this.model)
        this.toastr.success('Reset link has been sent')
      },
      error: error => {
        console.log(error.error)
      }
    })
  }

  forgotPassword2() {
    console.log(this.model)
  }

}
