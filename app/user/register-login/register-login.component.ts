import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder} from "@angular/forms";
import {UserService} from "../../shared/user.service";
import {LoginData} from "../../shared/login-data";
import {Router} from "@angular/router";
import {UserData} from "../../shared/user-data";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {RegistrationData} from "../../shared/registration-data";

@Component({
  selector: 'pr-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {

  public isLogin: boolean = true;

  constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
      private router: Router,
      private cookieService: CookieService
  ) { }

  ngOnInit() {
  }

  toLogin(){
    this.isLogin = true;
  }

  toRegister(){
    this.isLogin = false;
  }

  // login part

  public loginform = this.formBuilder.group({
    email:  ['', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: []
  });

  onSubmitLogin(){

    let formValue = this.loginform.value;
    let remember = formValue['remember'];
    delete formValue['remember'];
    let loginData: LoginData = formValue;

    this.userService.login(loginData).subscribe(
        (data: UserData) => {

              if(data['id']){
                // remove previus user cookies
                this.cookieService.removeAll(),
                    console.log(data),
                        // check if remember check in login is checked
                          // add data to user or to cookies
                            // if add data to cookies, also add in userData
                        remember != null ? this.cookieService.putObject('user', data) : this.userService.userData = data,
                        this.cookieService.getObject('user') != null ? this.userService.userData = data : this.router.navigate(['/home']),
                        this.router.navigate(['/home']);
              }else {
                    alert(data),
                    (error: any) => console.log(error)
              }
        }
    );
  };

  // register part

  public registerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email:  ['', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSuccess(value: any){
    alert(value);
    this.router.navigate(['/home'])
  }

  onSubmitRegister(){
    if(this.registerForm.value.password == this.registerForm.value.repeatPassword){

      let formValue = this.registerForm.value;
      delete formValue['repeatPassword'];
      let registrationData: RegistrationData = formValue;

      this.userService.register(registrationData).subscribe(
          (answer: any) => {
            answer == 'Confirm e-mail to activate account' ? this.onSuccess(answer) : alert(answer);
          },
          error => console.log(error)
      );
    }else{
      alert("Password and repeated password don't match.")
    }
  }

  onCancel(){
    this.registerForm.reset();
  }
}
