export default calculateMapDeltas = (topLeft, botRight) => 
{
    const latitudeDelta = Math.abs(topLeft.latitude - botRight.latitude) * 1.5;
    const longitudeDelta = Math.abs(topLeft.longitude - botRight.longitude) * 1.5;
    return { latitudeDelta, longitudeDelta };
};