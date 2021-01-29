//Interfaz para poder pasar valores entre ventanas
export interface MapNavigation {
  key: string;
  name: string;
  params: params;
}

//Interfaz de los datos que quiero pasar del filtro al mapa
interface params {
  nombreRuta: string;
  latitude: string;
  longitude: string;
  loc: Array<Object>;
  vehiculo: string;
  idRuta: string;
  idUsuario: string;
}
