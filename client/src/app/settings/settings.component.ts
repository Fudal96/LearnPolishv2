import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{

  rUrl = {
    returnUrl: "https://localhost:4200"
  }

  constructor(public accountService: AccountService) {}


  goToBillingPortal() {
    this.accountService.redirectToCustomerPortal(this.rUrl);
  }

  ngOnInit(): void {

  }

}
