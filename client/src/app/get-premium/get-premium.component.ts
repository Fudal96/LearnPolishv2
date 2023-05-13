import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { getUsername } from '../_models/getUsername';

@Component({
  selector: 'app-get-premium',
  templateUrl: './get-premium.component.html',
  styleUrls: ['./get-premium.component.scss']
})
export class GetPremiumComponent implements OnInit{
getusername: getUsername | any;


  companyForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    creditCard: this.fb.group({
      name: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required]),
      expirationYear: new FormControl('', [Validators.required]),
      expirationMonth: new FormControl('', [Validators.required]),
      cvc: new FormControl('', [Validators.required]),
    }),
  })

  usernameForm = this.fb.group({
    username: new FormControl('', [Validators.required]),
  })





  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService, private fb: FormBuilder) {

  }


  ngOnInit(): void {
    this.accountService.currentUsername$.subscribe(getusername => this.getusername = getusername)
  }


  getPremium() {
   this.accountService.addCustomer((this.companyForm.value)).subscribe({
    next: () => {
        console.log(this.companyForm.value)
        this.getCurrentUsername()
      },
      error: error => {
        console.log(error)
        console.log(this.companyForm.value)

      }
    })
  }

  getCurrentUsername() {
    console.log(this.usernameForm.value)
    const currentusername = this.usernameForm.value
    this.accountService.setCurrentUsername(currentusername)
  }

  test() {

  }




}
