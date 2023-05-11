import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../_models/customer';
import { Payment } from '../_models/payment';

@Injectable({
  providedIn: 'root'
})
// AccountService is responsible for making an http requests from a client to a server 'account/login' account is the name of our controller
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

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

  addCustomer(model: any) {
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
        } else {
          console.log('no payment')
        }
      })
    )
  }

  pay() {

  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]))
  }
}
