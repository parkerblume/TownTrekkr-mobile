export default getMidPointCoordinate = (topLeft, botRight) =>
{
    if (topLeft && botRight)
    {
        return {
            latitude: (topLeft.latitude + botRight.latitude) / 2,
            longitude: (topLeft.longitude + botRight.longitude) / 2,
        };
    }

    return null;
}