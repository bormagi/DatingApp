import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  
  constructor (private http: HttpClient) {
  }

  title = 'The Dating App';
  users: any;

  ngOnInit(): void {
    this.http.get("https://localhost:5001/users").subscribe(
      resp => this.users = resp,
      error => console.log(error));
  }

}
