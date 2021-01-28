export interface MapNavigation {
  key: string;
  name: string;
  params: params;
}

interface params {
  nombreRuta: string;
  latitude: string;
  longitude: string;
  loc: Array<Object>;
  vehiculo: string;
  idRuta: string;
  idUsuario: string;
}
