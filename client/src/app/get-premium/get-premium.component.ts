import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-get-premium',
  templateUrl: './get-premium.component.html',
  styleUrls: ['./get-premium.component.scss']
})
export class GetPremiumComponent implements OnInit{




  companyForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    creditCard: this.fb.group({
      name: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required]),
      expirationYear: new FormControl('', [Validators.required]),
      expirationMonth: new FormControl('', [Validators.required]),
      cvc: new FormControl('', [Validators.required]),
    })
  })

 


  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService, private fb: FormBuilder) {

  }


  ngOnInit(): void {

  }


  getPremium() {
   this.accountService.addCustomer((this.companyForm.value)).subscribe({
    next: () => {
        console.log(this.companyForm.value)
      },
      error: error => {
        console.log(error)
        console.log(this.companyForm.value)
      }
    })
  }

  test() {

    console.log(this.companyForm.value)
  }




}
