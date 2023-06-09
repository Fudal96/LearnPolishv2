import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  model: any = {}

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) {}


  ngOnInit(): void {
    var user = localStorage.getItem('user');
    var userParse = JSON.parse(user!)
    var username = userParse.username
    console.log(username)
    const obj = {
      username: username
    }
    console.log(obj)
    this.accountService.setRole(obj).subscribe({
      next: () => {
        console.log('premium?')
        setTimeout(() => {
          this.logout();
        }, 5000)
      }
    })
  }



  logout() {
    this.toastr.success('Please log in to your account')
    this.accountService.logout();
    this.router.navigateByUrl('/');
    this.model = {};
  }


}
