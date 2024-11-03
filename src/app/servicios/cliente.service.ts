import { Injectable } from '@angular/core';
import { Cliente } from '../modelo/cliente.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable()
export class ClienteServicio {
  clientesColeccion: AngularFirestoreCollection<Cliente>;
  clientes: Observable<Cliente[]>;
  constructor(private firestore: AngularFirestore) {
    // Inicializa la colección con la referencia y la consulta
    this.clientesColeccion = this.firestore.collection<Cliente>(
      'clientes',
      (ref) => ref.orderBy('nombre', 'asc')
    );
    // Obtén los datos de la colección
    this.clientes = this.clientesColeccion.valueChanges({ idField: 'id' });
  }
  getClientes(): Observable<Cliente[]> {
    return this.clientes;
  }

  agregarCliente(cliente: Cliente) {
    this.clientesColeccion.add(cliente);
  }

  getCliente(id: string): Observable<Cliente | null> {
    return this.firestore
      .doc<Cliente>(`clientes/${id}`)
      .valueChanges({ idField: 'id' })
      .pipe(map((cliente) => (cliente ? cliente : null)));
  }

  modificarCliente(cliente: Cliente) {
    const clienteDoc = this.firestore.doc<Cliente>(`clientes/${cliente.id}`);
    return clienteDoc.update(cliente);
  }
  eliminarCliente(cliente: Cliente) {
    const clienteDoc = this.firestore.doc<Cliente>(`clientes/${cliente.id}`);
    return clienteDoc.delete();
  }
}
