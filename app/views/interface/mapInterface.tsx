export interface Directions {
  latitud: number;
  longitud: number;
  nombre: string;
  oculto: number;
  preguntas:Array<string>
  respuestas:Array<Array<string>>
}

export interface PolyLineDirections {
  latitude: number;
  longitude: number;
}