//Interfaz de los datos que tiene un objeto ruta
export interface Ruta {
  idRuta: string;

  nombre: string;

  longitud: number;

  vehiculo: string;

  ciudad: string;

  dificultad: string;

  tiempo: number;

  imagen: string;

  loc: Array<Object>;
}
