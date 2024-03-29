import {BASE_URL} from './config';

export const login = async (email, password) => 
{
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };
  
export const signup = async (email, password, username) => 
{
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

export const createTown = async (name, description, topLeftCoord, botRightCoord, creatingUser_id, creatingUsername) =>
{
  try {
    const sendingData =
    {
      name,
      description,
      topLeftCoord,
      botRightCoord,
      creatingUser_id,
      creatingUsername
    };

    const response = await fetch(`${BASE_URL}/createtown`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendingData),
    });
    const data = await response.json();
    console.log(data.town);
    if (data.town) { return true; }
    else { return null; }

  } catch (error) {
    console.error('Error to create town: ', error);
    throw error;
  }
};

export const addUserToTown = async (townId, userId) =>
{
  try {
    const response = await fetch(`${BASE_URL}/adduser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ townId, userId }),
    });

    const data = await response.json();
    if (data.ok) { return true; }
    else { return false; }

  } catch (error) {
    console.error('Error adding user to town: ', error);
    throw error;
  }
};

export const getTowns = async (userId) => {
  try {
    let url = `${BASE_URL}/gettowns`;
    
    // append userId as query parameter, if it it exists
    if (userId) {
      url += `?userId=${userId}`;
    }

    const response = await fetch(url, {
      method: 'GET',
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