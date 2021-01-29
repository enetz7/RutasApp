//Interfaz de las localizaciones
export interface Directions {
  latitud: number;
  longitud: number;
  nombre: string;
  oculto: number;
  preguntas: Array<string>;
  respuestas: Array<Array<string>>;
}

//Interfaz de las polyLines para poder escribir los objectos de coordenadas
export interface PolyLineDirections {
  latitude: number;
  longitude: number;
}

//Interfaz de los markers para poder establecer sus coordenadas
export interface CoordenatesObjects {
  lat: number;
  lng: number;
}
