import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
})
export class ConfirmEmailComponent implements OnInit {
  emailConfirmed: boolean = false;
  urlParams: any = {};

  constructor(
    private route: ActivatedRoute,
    public accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.urlParams.token = this.route.snapshot.queryParamMap.get('token');
    this.urlParams.userid = this.route.snapshot.queryParamMap.get('userid');
    this.confirmEmail();
  }

  confirmEmail() {
    this.accountService.confirmEmail(this.urlParams).subscribe(
      () => {
        console.log('success');
        this.toastr.success('Email Confirmed');
        this.emailConfirmed = true;
      },
      (error) => {
        console.log(error);
        this.toastr.error('Unable to confirm email');
        this.emailConfirmed = false;
      }
    );
  }
}
