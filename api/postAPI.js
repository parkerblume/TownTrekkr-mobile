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

        const response = await fetch(`${BASE_URL}/posts/createpost`, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const data = await response.json();
        if (data) { return data; }
        else { return null; }
    } catch (error)
    {
        console.error(error);
    }
}

export const getPostsByTown = async (townId) =>
{
    try {
        const response = await fetch(`${BASE_URL}/posts/getpostsbytown`, {
            method: 'POST',
            body: JSON.stringify({ townId }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        const data = await response.json();
        if (data) { return data; }
        else { return null; }
    } catch (error)
    {
        console.error(error);
    }
}

export const getPhotoImage = async (fileId) =>
{
    try {
        const response = await fetch(`${BASE_URL}/posts/getimage`, {
            method: 'POST',
            body: JSON.stringify({ fileId }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        if (response.ok)
        {
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            return imageUrl;
        }
        else
        {
            console.error('Error fetching image: ', response.status);
            return null;
        }
    } catch (error)
    {
        console.error(error);
    }
}