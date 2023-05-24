import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';
import { getUsername } from '../_models/getUsername';
import { ISession } from '../_models/IMemberships';

declare const Stripe: any;


@Injectable({
  providedIn: 'root'
})
// AccountService is responsible for making an http requests from a client to a server 'account/login' account is the name of our controller
export class AccountService {
  baseUrl = environment.apiUrl;



  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

   private currentUsernameSource = new BehaviorSubject<getUsername | null>(null);
  currentUsername$ = this.currentUsernameSource.asObservable();

  constructor(private http: HttpClient) { }


  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }



  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  confirmEmail(model: any) {
    return this.http.post(this.baseUrl + 'account/confirmemail', model);
  }



  setRole(model: any) {
    return this.http.post<getUsername>(this.baseUrl + 'payments/payment/add/role', model).pipe(
      map((response: getUsername) => {
        const username = response;
        if (username) {
          console.log(username)
        }
      })
    )
  }



  requestMemberSession(model: any) {
    return this.http.post<ISession>(this.baseUrl + 'payments/create-checkout-session', model).pipe(
      map((response: ISession) => {
        const session = response;
        if (session) {
          console.log(session)
          this.redirectToCheckout(session.sessionId);
        }
      })
    )
  }

  redirectToCheckout(sessionId: string) {
    const stripe = Stripe('pk_test_51N1AX9GrXwZ3ORKWZJUtJESKPOPXExxpoxr7FYUyvtLu5iG2NQ9qk2rjJ9h8K7Z4aTK821QGfeMnrWR6uHpl0NPa00RilzBLPP');

    stripe.redirectToCheckout({
      sessionId: sessionId,
    });
  }



  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  setCurrentUsername(getusername: getUsername | any) {
    this.currentUsernameSource.next(getusername);
    console.log(this.currentUsernameSource.value)
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]))
  }




  forgotPassword(model: any) {
    return this.http.post(this.baseUrl + 'account/forgotpassword', model);
  }

  resetPassword(model: any) {
    return this.http.post(this.baseUrl + 'account/resetpassword', model);
  }

  sendEmailConfirmationLink(model: any) {
    return this.http.post(this.baseUrl + 'account/sendemailconfirmationlink', model);
  }
}











 /*addCustomer(model: any) {
    return this.http.post<Customer>(this.baseUrl + 'stripe/customer/add', model).pipe(
      map((response: Customer) => {
        const customer = response;
        if (customer) {
          const newPayment = {
            customerId: customer.customerId,
            recipientEmail: customer.email,
            description: "E-learning Polish Premium Membership",
            currency: "USD",
            amount: 1200
          }
          console.log(newPayment)
          this.addPayment(newPayment).subscribe({
            next: () => {
              console.log(newPayment)

            }
          })
        } else {
          console.log('no customer')
        }
      })
    )
  }

  addPayment(model: any) {
    return this.http.post<Payment>(this.baseUrl + 'stripe/payment/add', model).pipe(
      map((response: Payment) => {
        const payment = response;
        if (payment) {
          console.log(payment)
          this.setRole(this.currentUsernameSource.value).subscribe({
            next: () => {
              console.log(this.currentUsernameSource.value)
            }
          })
        } else {
          console.log('no payment')
        }
      })
    )
  } */

   /*redirectToCustomerPortal(model: any) {

    this.http
      .post<ICustomerPortal>(
        this.baseUrl + 'payments/customer-portal', model, this.getHttpOptions()
      )
      .subscribe((data) => {
        window.location.href = data.url;
      });
  }

  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return httpOptions;
  }*/
