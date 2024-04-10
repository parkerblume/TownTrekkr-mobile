// Check for location being in bounds, thanks stackOverflow
export default isLocationInBounds = (location, topLeft, botRight) => {
    const pointLong = location.longitude;
    const pointLat = location.latitude;
    const { latitude: topLeftLat, longitude: topLeftLong } = topLeft;
    const { latitude: botRightLat, longitude: botRightLong } = botRight;

    return (
        pointLat >= botRightLat &&
        pointLat <= topLeftLat &&
        pointLong >= topLeftLong &&
        pointLong <= botRightLong
    );
};