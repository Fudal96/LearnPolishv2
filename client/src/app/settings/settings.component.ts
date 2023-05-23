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


  constructor(public accountService: AccountService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) {}




  ngOnInit(): void {

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

}









 /*goToBillingPortal() {
    this.accountService.redirectToCustomerPortal(this.rUrl);
  } */
