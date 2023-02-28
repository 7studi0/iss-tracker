import * as Cesium from 'cesium';
import axios from 'axios';
import { Promise } from 'rsvp';

const API_ENDPOINT = 'http://api.open-notify.org/iss-now.json';

export async function getISSPosition(): Promise<Cesium.Cartesian3> {
  try {
    const response = await axios.get(API_ENDPOINT);

    if (response.status !== 200) {
      throw new Error('Invalid resoponse status');
    }

    const data = response.data;

    if (!data || !data.iss_position) {
      throw new Error('Invalid response data');
    }

    const { latitude, longitude } = data.iss_position;

    if (isNaN(latitude) || isNaN(longitude)) {
      throw new Error('Invalid response data format');
    }

    return Cesium.Cartesian3.fromDegrees(
      parseFloat(longitude),
      parseFloat(latitude)
    );
  } catch (error: any) {
    throw new Error(`Failed to fetch ISS position: ${error.message}`);
  }
}
