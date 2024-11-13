import { Component } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from '../../servicios/configuracion.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrl: './cabecero.component.css'
})
export class CabeceroComponent {

isLoggedIn: boolean;
loggedInUser: string;
permitirRegistro: boolean;

constructor(private loginService: LoginService,
            private router: Router,
            private configuracionServicio: ConfiguracionServicio
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

  this.configuracionServicio.getConfiguracion().subscribe( configuracion => {
    this.permitirRegistro = configuracion?.permitirRegistro ?? false;
  }
  )
}

logout(){
  this.loginService.logout();
  this.isLoggedIn = false;
  this.router.navigate(['/login']);
}

}
