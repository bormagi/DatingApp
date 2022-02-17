import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model:any = {}

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  register (){
    console.log(this.model);
    this.accountService.register(this.model).subscribe(
      response => { 
        console.log('Registration Complete');
        console.log(response);
        this.cancel();
      }, error => {console.log('Registration Failed'); console.log(error);}
    )
  }

  cancel(){
    console.log('Cancelled');
    this.cancelRegister.emit(false);
  }

}
