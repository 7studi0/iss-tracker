import { useEffect, useState } from 'react';
import { Viewer, Entity } from 'resium';
import * as Cesium from 'cesium';

import { getISSPosition } from '@/features/api/getISSPosition';

export default function ISSViewer() {
  const [position, setPosition] = useState<Cesium.Cartesian3>();
  const [orbit, setOrbit] = useState<Cesium.Cartesian3[]>([]);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const interval = setInterval(() => {
      getISSPosition()
        .then((position: Cesium.Cartesian3) => {
          const cartographic = Cesium.Cartographic.fromCartesian(position);
          const height = cartographic.height;
          const degrees = Cesium.Math.toDegrees(cartographic.longitude);
          const latitude = Cesium.Math.toDegrees(cartographic.latitude);
          const cartesianWithHeight = Cesium.Cartesian3.fromDegrees(
            degrees,
            latitude,
            height
          );
          setPosition(cartesianWithHeight);
          setOrbit(orbit => [...orbit, cartesianWithHeight]);
          setError(undefined);
        })
        .catch(error => {
          console.log('Error fetching ISS position:', error);
          setError(error);
        });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Viewer full>
      {position && (
        <>
          <Entity
            name='ISS'
            position={position}
            point={{ pixelSize: 10, color: Cesium.Color.YELLOW }}
          />
        </>
      )}
      {orbit.length > 0 && (
        <Entity name='ISSOrbit' polyline={{ positions: orbit }} />
      )}
    </Viewer>
  );
}
