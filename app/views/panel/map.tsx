import * as React from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

export interface MapProps {
}

export default function Map (props: MapProps) {

    return (
      <View>
        <MapView style={{width: 600, height: 800}}
        region={{
          latitude: 43.3390400,
          longitude:  -1.7893800,
          latitudeDelta: 0.003,
          longitudeDelta: 0.02,
        }}/>
      </View>
    );
    
}
