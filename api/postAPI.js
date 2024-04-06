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
        return data;
    } catch (error)
    {
        console.error(error);
    }
};

export const getGuesses = async (userId) =>
{
    try {
      let url = `${BASE_URL}/user/getguesses?userId=${userId}`;
      
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching towns:', error);
      throw error;
    }
  };