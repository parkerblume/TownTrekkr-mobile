import {BASE_URL} from './config';
import * as FileSystem from 'expo-file-system';

export const postUpload = async (image, location, title, townId, userId) =>
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
        formData.append('title', title);
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
            const reader = new FileReader();
            
            // convert blob to base64 because Android sucks
            return new Promise((resolve, reject) =>
            {
                reader.onloadend = async () => {
                    const base64data = reader.result.split(',')[1];
                    const fileUri = `${FileSystem.documentDirectory}${fileId}.jpeg`;

                    try {
                        await FileSystem.writeAsStringAsync(fileUri, base64data, {
                            encoding: FileSystem.EncodingType.Base64,
                        });
                        
                        resolve(fileUri);
                    } catch (error) {
                        reject(error);
                    };

                    reader.onerror = (error) => {
                        reject(error);
                    };
                }

                reader.readAsDataURL(blob);
            });
            // const imageUrl = URL.createObjectURL(blob);
            // console.log(imageUrl);
            // return imageUrl;
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

export const postUserGuess = async (userid, postid, score, distanceAway, hasliked = false) =>
{
    try {
        const response = await fetch(`${BASE_URL}/user/makeguess`, {
            method: 'POST',
            body: JSON.stringify({ userid, postid, score, distanceAway, hasliked }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        if (response.ok) { return data; }
        else { return null; }

    } catch (error)
    {
        console.error(error);
    }
}