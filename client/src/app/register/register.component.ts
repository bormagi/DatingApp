import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model:any = {}

  constructor(public accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register (){
    console.log(this.model);
    this.accountService.register(this.model).subscribe(
      response => { 
        console.log('Registration Complete');
        console.log(response);
        this.cancel();
      }, error => {console.log('Registration Failed'); console.log(error); this.toastr.error(error.error); }
    )
  }

  cancel(){
    console.log('Cancelled');
    this.cancelRegister.emit(false);
    this.toastr.info('you cancelled, what a pitty'); 
  }

}
