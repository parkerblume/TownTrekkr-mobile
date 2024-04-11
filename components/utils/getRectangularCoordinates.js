export default getRectangularCoordinates = (topLeft, botRight) => 
{
    if (topLeft && botRight)
    {
        return [
            topLeft,
            { latitude: topLeft.latitude, longitude: botRight.longitude }, // bottom left coord
            botRight,
            { latitude: botRight.latitude, longitude: topLeft.longitude }, // top right coord
        ];
    }

    return [];
};