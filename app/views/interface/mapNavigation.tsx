export interface MapNavigation {
  key: string;
  name: string;
  params: params;
}

interface params {
  latitude: string;
  longitude: string;
  loc:Array<Object>;
  vehiculo:string;
}
