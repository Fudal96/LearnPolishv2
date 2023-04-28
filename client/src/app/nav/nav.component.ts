import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
modalRef?: BsModalRef;
isCollapsed: boolean = true;
model: any = {};
registerMode = false;


constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService, private modalService: BsModalService ) {}


  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }




  login() {
    this.accountService.login(this.model).subscribe({
      next: () =>
        //this.router.navigateByUrl('/members')
        console.log('You have logged in')
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    this.isCollapsed = !this.isCollapsed;
    this.model = {};
  }

  registerToggle() {
    this.registerMode = !this.registerMode
  }



  cancelRegisterMode(event: boolean) {
  this.registerMode = event;
}

}
