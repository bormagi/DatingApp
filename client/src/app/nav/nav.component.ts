import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  token: string = "";
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      console.log('Component Login Method:');
      console.log(response);
      //this.token  = response["token"];
      //console.log(this.token);
      
      
    }, error => {console.log(error)});
  }

  logout() {
    this.accountService.logout();
    this.token = "";
    this.model = {};
    console.log(this.token);
  }

}
