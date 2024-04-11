import {BASE_URL} from './config';
import * as FileSystem from 'expo-file-system';

export const postUpload = async (image, location, title, townName, userId) =>
{
    try 
    {
        const fileUri = image.uri;
        //console.log("fileuri: " + fileUri);

        const fileName = fileUri.split('/').pop();
        //console.log("filename: " + fileName);

        const uriArray = image.uri.split(".");
        const fileExtension = uriArray[uriArray.length - 1];  // e.g.: "jpg"
        const fileTypeExtended = `${image.type}/${fileExtension}`; // e.g.: "image/jpg"
        //console.log("filetype: " + fileTypeExtended);
        //console.log("fileExtension: " + fileExtension);


        const formData = new FormData();

        formData.append('image', {
            uri: fileUri,
            name: fileName,
            type: fileTypeExtended,
        });

        formData.append('user_id', userId);
        formData.append('town', townName);
        formData.append('title', title);
        formData.append('coordinateX', location.latitude);
        formData.append('coordinateY', location.longitude);
        
        console.log('form stuffs');

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
};

export const userRatePost = async (post_id, user_id, rating) =>
{
    console.log(rating);
    try {
        const response = await fetch(`${BASE_URL}/posts/rate`, {
            method: 'POST',
            body: JSON.stringify({ post_id, user_id, rating }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log(data);
        if (data) { return true; }
        else { return false; }

    } catch (error)
    {
        console.error(error);
    }
};

export const getGuesses = async (userid) =>
{
    try {
      let url = `${BASE_URL}/user/getguesses`;
      
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userid}),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data.guesses;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching towns:', error);
      throw error;
    }
  };

export const getPostById = async (post_id) =>
{
    try {
        let url = `${BASE_URL}/posts/getpost`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({post_id}),
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching post by id:', error);
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
              //console.log(towns[i].name);
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