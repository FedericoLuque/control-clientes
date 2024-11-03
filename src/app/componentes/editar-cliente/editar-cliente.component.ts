import { Component } from '@angular/core';
import { Cliente } from '../../modelo/cliente.model';
import { ClienteServicio } from '../../servicios/cliente.service';
import { AlertMessagesService } from 'jjwins-angular-alert-messages';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css',
})
export class EditarClienteComponent {
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: undefined,
  };

  id: string;

  constructor(
    private clientesServicio: ClienteServicio,
    private alertMessageService: AlertMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientesServicio
      .getCliente(this.id)
      .subscribe((cliente: Cliente | null) => {
        if (cliente) {
          this.cliente = cliente;
        } else {
          // Manejar el caso en el que el cliente es null
          console.warn('Cliente no encontrado');
        }
      });
  }

  eliminar() {
    if (confirm('¿Seguro que desea eliminar el cliente?')) {
      this.clientesServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }

  guardar(clienteForm: NgForm) {
    const { value, valid } = clienteForm;
    if (!valid) {
      this.alertMessageService.show(
        'Por favor llena el formulario correctamente',
        { cssClass: 'alerts-error', timeOut: 4000 }
      );
    } else {
      value.id = this.id;
      //modificar cliente
      this.clientesServicio.modificarCliente(value);
      this.router.navigate(['/']);
    }
  }


}
