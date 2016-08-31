import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from "@angular/core";
import {User} from '../../shared/user/user';
import {UserService} from '../../shared/user/user.service';
import {Router} from '@angular/router';
import {Page} from 'ui/page';
import {Color} from 'color';
import {View} from 'ui/core/view';
import {setHintColor} from '../../utils/hint-util';
import {TextField} from 'ui/text-field';

@Component({
  selector: "my-app",
  templateUrl: 'pages/login/login.html',
  styleUrls: ['pages/login/login-common.css', 'pages/login/login.css'],
  providers: [UserService]
})
export class LoginPage implements OnInit {
  user:User;
  isLoggedIn:boolean = true;
  isLoggingIn:boolean = true;
  @ViewChild('container') container:ElementRef;
  @ViewChild('email') emailRef:ElementRef;
  @ViewChild('password') passwordRef:ElementRef;

  constructor(private userService:UserService, private router:Router, private page:Page) {
    this.user = new User();
    this.user.email = "lourens_M@hotmail.com";
    this.user.password = "test";
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.backgroundImage = "res://bg_login";
  }

  setTextFieldColors() {
    let emailTextField:TextField = <TextField>this.emailRef.nativeElement;
    let passwordTextField:TextField = <TextField>this.passwordRef.nativeElement;

    let mainTextColor:Color = new Color(this.isLoggedIn ? "black" : "#C4AFB4");
    emailTextField.color = mainTextColor;
    passwordTextField.color = mainTextColor;

    let hintColor:Color = new Color(this.isLoggedIn ? "#ACA6A7" : "#C4AFB4");
    setHintColor({view: emailTextField, color: hintColor});
    setHintColor({view: passwordTextField, color: hintColor});
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
    if (!this.user.isValidEmail()) {
      alert("Enter a valid email address")
      return
    }
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
    let container = <View>this.container.nativeElement;
    container.animate({
      backgroundColor: this.isLoggedIn ? new Color('white') : new Color('#301217'),
      duration: 200
    });
    this.setTextFieldColors();
  }

  
}