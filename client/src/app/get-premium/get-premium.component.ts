import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { getUsername } from '../_models/getUsername';
import { Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement, loadStripe } from '@stripe/stripe-js';

const PriceId = {
    priceId: 'price_1N7MW7GrXwZ3ORKWqqdWZlp7'
  }



@Component({
  selector: 'app-get-premium',
  templateUrl: './get-premium.component.html',
  styleUrls: ['./get-premium.component.scss']
})
export class GetPremiumComponent implements OnInit{
getusername: getUsername | any;
/*
@ViewChild('cardNumber') cardNumberElement?: ElementRef;
@ViewChild('cardExpiry') cardExpiryElement?: ElementRef;
@ViewChild('cardCvc') cardCvcElement?: ElementRef;
stripe: Stripe | null = null;
cardNumber?: StripeCardNumberElement | any;
cardExpiry?: StripeCardExpiryElement;
cardCvc?: StripeCardCvcElement; */


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

    /*loadStripe('pk_test_51N1AX9GrXwZ3ORKWZJUtJESKPOPXExxpoxr7FYUyvtLu5iG2NQ9qk2rjJ9h8K7Z4aTK821QGfeMnrWR6uHpl0NPa00RilzBLPP').then(stripe => {
      this.stripe = stripe;
      const elements = stripe?.elements();
      if (elements) {
        this.cardNumber = elements.create('cardNumber');
        this.cardNumber.mount(this.cardNumberElement?.nativeElement);

        this.cardExpiry = elements.create('cardExpiry');
        this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);

        this.cardCvc = elements.create('cardCvc');
        this.cardCvc.mount(this.cardCvcElement?.nativeElement);
      }
    })*/
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
    this.accountService.requestMemberSession(PriceId).subscribe({
      next: () => {
        console.log('success')
      }
    })
  }

  test1() {
    console.log(PriceId.priceId)
    console.log(PriceId)
  }


}
