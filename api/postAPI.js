import {BASE_URL} from './config';

export const postUpload = async (image, location, townId, userId) =>
{
    try 
    {
        const fileUri = image.uri;

        const fileName = fileUri.split('/').pop();
        const fileType = image.type;

        const formData = new FormData();

        formData.append('image', {
            uri: fileUri,
            name: fileName,
            type: fileType,
        });

        formData.append('user_id', userId);
        formData.append('town', townId);
        formData.append('coordinateX', location.latitude);
        formData.append('coordinateY', location.longitude);

        const response = await fetch(`${BASE_URL}/createpost`, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const data = await response.json();
        return data;
    } catch (error)
    {
        console.error(error);
    }
}