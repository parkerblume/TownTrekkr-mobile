import { degToRad } from "three/src/math/MathUtils.js";

// this uses Haversine formula for calculating distance between 2 coords
export default calculateDistance = (topLeft, botRight) =>
{
    const R = 6371;
    const dLat = degToRad(botRight.latitude - topLeft.latitude);
    const dLon = degToRad(botRight.longitude - topLeft.longitude);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(topLeft.latitude)) * Math.cos(degToRad(botRight.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance * 1000; // km -> meters
}