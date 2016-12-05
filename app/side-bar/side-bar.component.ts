import { Component, OnInit } from '@angular/core';
import {UserService} from "../shared/user.service";

@Component({
  selector: 'pr-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  isMenuOpen: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  isUserLogin(){
    if(this.userService.userData != null){
      return true;
    }else{
      return false;
    }
  }

  switchMenu(){
    if(this.isMenuOpen){
      this.isMenuOpen = false;
    }else{
      this.isMenuOpen = true;
    }
  }
}
