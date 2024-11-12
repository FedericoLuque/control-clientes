import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from '../../servicios/configuracion.service';
import { Configuracion } from '../../modelo/configuracion.model';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  permitirRegistro = false;

  constructor(
    private router: Router,
    private configuracionServicio: ConfiguracionServicio
  ) { }

  ngOnInit() {
    this.configuracionServicio.getConfiguracion().subscribe(
      (configuracion: Configuracion | null) => {
        this.permitirRegistro = configuracion?.permitirRegistro ?? false;
      }
    )
  }

  guardar(){
    let configuracion = {permitirRegistro: this.permitirRegistro};
    this.configuracionServicio.modificarConfiguracion(configuracion);
    this.router.navigate(['/']);
  }

}
