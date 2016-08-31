import {Component} from "@angular/core";
import {User} from '../../shared/user/user';
import {UserService} from '../../shared/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: "my-app",
  templateUrl: 'pages/login/login.html',
  styleUrls: ['pages/login/login-common.css', 'pages/login/login.css'],
  providers: [UserService]
})
export class LoginPage {
  user:User;
  isLoggedIn:boolean = true;

  constructor(private userService:UserService, private router:Router) {
    this.user = new User();
    this.user.email = "lourens_M@hotmail.com";
    this.user.password = "test";
  }

  submit() {
    if (this.isLoggedIn) {
      this.login();
    } else {
      this.signup();
    }
  }

  login() {
    this.userService.login(this.user)
        .subscribe(
          () => this.router.navigate(['/list']),
          (error) => alert("Unfortunately we could not find your account.")
        )
  }

  signup() {
    console.log(`Your email is: ${this.user.email}`);
    this.userService.registerUser(this.user)
      .subscribe(() => {
        alert("Your account was successfully created.");
        this.toggleDisplay();
      }, (err) => {
        alert("Unfortunately we were unable to create your account.");
        console.log(err);
      })
  }

  toggleDisplay() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  
}