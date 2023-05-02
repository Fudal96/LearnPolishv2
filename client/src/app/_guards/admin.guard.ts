import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private accountService: AccountService, private toastr: ToastrService) {}

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (!user) {
          this.toastr.error("You need to be a Premium Member to access this content");
          return false;
        }
        if (user.roles.includes('PremiumMember')) {
          return true
        } else {
          this.toastr.error("You need to be a Premium Member to access this content");
          return false;
        }
      })
    )
  }

}
