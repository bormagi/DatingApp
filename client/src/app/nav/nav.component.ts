import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      console.log('Component Login Method:');
      console.log(response);
      this.router.navigateByUrl('/members');
      this.toastr.success('Thanks for loggin in');
      //this.token  = response["token"];
      //console.log(this.token);
      
      
    }, error => {console.log(error); this.toastr.error(error.error)});
  }

  logout() {
    this.accountService.logout();
    this.token = "";
    this.model = {};
    console.log(this.token);
    this.toastr.info('Logged Out!');
    this.router.navigateByUrl('/');
  }

}
