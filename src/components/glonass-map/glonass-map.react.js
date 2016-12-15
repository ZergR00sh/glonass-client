import './glonass-map.scss';
import React from 'react';
import {
    Map, Marker,
    Popup, TileLayer,
} from 'react-leaflet';

/**
 * Glonass map component
 * @return {React.Component}
 */
export default function GlonassMap({devices, filter}) {
  console.log(devices);
  return (
    <Map
      center={[45, 30]}
      zoom={4}
      zoomControl={false}>
      <TileLayer
       url='http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}'
       attribution={'Imagery from <a href="http://giscience.uni-hd.de/">GIScience'
        + ' Research Group @ University of Heidelberg</a> &mdash; Map data '
        + '&copy;'
        + ' <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}
      />
      {devices
        .filter((device) => device.imei == filter)
        .map((device, i) => {
          return (
            <Marker
              key={i}
              position={[device.lat, device.lng]}>
              <Popup>
                <div>
                  <p>Device name: <b>{device.name}</b></p>
                  <p>Device imei: <b>{device.imei}</b></p>
                </div>
              </Popup>
            </Marker>
          );
        })}
    </Map>
  );
}
