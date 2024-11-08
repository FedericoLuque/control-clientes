import { Component } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrl: './cabecero.component.css'
})
export class CabeceroComponent {

isLoggedIn: boolean;
loggedInUser: string;

constructor(private loginService: LoginService,
            private router: Router
){}

ngOnInit() {
  this.loginService.getAuth().subscribe( auth => {
    if(auth){
      this.isLoggedIn = true;
      this.loggedInUser = auth.email || "";
    }
    else{
      this.isLoggedIn = false;
    }
  });
}

logout(){
  this.loginService.logout();
  this.isLoggedIn = false;
  this.router.navigate(['/login']);
}

}
