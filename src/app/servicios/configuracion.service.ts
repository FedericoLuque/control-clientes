import { Observable } from 'rxjs';
import { Configuracion } from '../modelo/configuracion.model';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class ConfiguracionServicio {
  configuracionDoc: AngularFirestoreDocument<Configuracion>;
  configuracion: Observable<Configuracion | null>;

  //id unico de la coleccion de configuracion
  id = '1';

  constructor(private firestore: AngularFirestore) {}

  getConfiguracion(): Observable<Configuracion | null> {
    this.configuracionDoc = this.firestore.doc<Configuracion>(
      `configuracion/${this.id}`
    );
    this.configuracion = this.configuracionDoc.valueChanges().pipe(
      map((configuracion) => (configuracion ? configuracion : null)) // Manejar el caso de undefined
    );

    return this.configuracion;
  }

  modificarConfiguracion(configuracion: Configuracion){
    this.configuracionDoc = this.firestore.doc<Configuracion>(
        `configuracion/${this.id}`
      );
      this.configuracionDoc.update(configuracion);
  }
}
