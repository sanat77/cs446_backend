import { RADIUS_OF_EARTH_IN_KMS } from '../Constants';

export const DistanceBetweenTwoCoordinatesOnEarth = (
    Latitude1: number,
    Longitude1: number,
    Latitude2: number,
    Longitude2: number
) => {
    const DegreesToRadians = (degrees: number) => {
        return degrees * (Math.PI / 180);
    };
    const deltaLatitude = DegreesToRadians(Latitude2 - Latitude1);
    const deltaLongitude = DegreesToRadians(Longitude2 - Longitude1);
    const intermediateVal =
        Math.pow(Math.sin(deltaLatitude / 2), 2) +
        Math.cos(DegreesToRadians(Latitude1)) *
            Math.cos(DegreesToRadians(Latitude2)) *
            Math.pow(Math.sin(deltaLongitude / 2), 2);
    const centralAngleBetweenPoints =
        2 *
        Math.atan2(Math.sqrt(intermediateVal), Math.sqrt(1 - intermediateVal));
    return RADIUS_OF_EARTH_IN_KMS * centralAngleBetweenPoints;
};
