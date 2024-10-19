import { Component } from '@angular/core';
import { ClienteServicio } from '../../servicios/cliente.service';
import { Cliente } from '../../modelo/cliente.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent {
  clientes: Cliente[];

  constructor(private clienteServicio: ClienteServicio) {}

  ngOnInit() {
    this.clienteServicio.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }
}
