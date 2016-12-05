import { Component, OnInit } from '@angular/core';
import { CookieService } from "angular2-cookie/services/cookies.service";
import { UserService } from "./shared/user.service";

@Component({
  selector: 'pr-start',
  template: `
    <p>
      start Works!
    </p>
  `,
  styles: []
})
export class StartComponent implements OnInit {

  constructor(
      private cookieService: CookieService,
      private userService: UserService
  ) { }

  ngOnInit() {
    if(this.cookieService.getObject('user') != null){
      this.userService.userData = this.cookieService.getObject('user');
    }
  }

}
