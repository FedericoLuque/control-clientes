import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertMessagesService } from 'jjwins-angular-alert-messages';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(
    private router: Router,
    private alertMessageService: AlertMessagesService,
    private loginService: LoginService
  ) {}

  ngOnInit(){
    this.loginService.getAuth().subscribe(auth =>{
      if(auth){
        this.router.navigate(['/']);
      }
    })
  }

  login() {
    this.loginService
      .login(this.email, this.password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.alertMessageService.show(error.message, {
          cssClass: 'alerts-error',
          timeout: 4000,
        });
      });
  }
}
