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

export const getUserPosts = async (userId) => 
{
  let userPosts = [];
    try {
        let url = `${BASE_URL}/town/gettowns?userId=${userId}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const towns = await response.json();

        if (response.ok) {
            for (let i = 0; i < towns.length; i++)
            {
              console.log(towns[i].name);
              let url = `${BASE_URL}/posts/getpostsbytown`;

              const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  townId: towns[i]._id,
                }),
              });

              const townPosts = await response.json();

              if (!response.ok) {
                console.error('Error fetching posts:', error);
                throw error;
              }

              for (let j = 0; j < townPosts.length; j++)
              {
                if (townPosts[j].user_id === userId)
                {
                  userPosts.push(townPosts[j]);
                  console.log(townPosts[j]);
                }
              }
            }

        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
    return userPosts;
}