
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DatingAppv7';

  constructor(private accountService: AccountService) {}

  ngOnInit():void {
    this.setCurrentUser();
  }



  setCurrentUser() {
    const userstring = localStorage.getItem('user');
    if (!userstring) return;
    const user: User = JSON.parse(userstring);
    this.accountService.setCurrentUser(user);
  }
}
