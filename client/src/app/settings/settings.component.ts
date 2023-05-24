import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{
model: any = {};
emailConfirmed: boolean = false;
emailAddress: string | any;
roles: any = {};
username: string | any;


  constructor(public accountService: AccountService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) {}




  ngOnInit(): void {
    this.isEmailCOnfirmed();
  }

  sendEmailConfirmationLink() {
    this.accountService.sendEmailConfirmationLink(this.model).subscribe({
      next: () => {
        console.log('sent')
        console.log(this.model)
      },
      error: error => {
        console.log(error)
      }
    })
  }

  isEmailCOnfirmed() {
    var user = localStorage.getItem('user');
    var userParse = JSON.parse(user!)
    var emailConfirmed = userParse.emailConfirmed;
    this.emailConfirmed = emailConfirmed;
    this.emailAddress = userParse.email;
    this.roles = userParse.roles;
    this.username = userParse.username;
  }


}









 /*goToBillingPortal() {
    this.accountService.redirectToCustomerPortal(this.rUrl);
  } */
