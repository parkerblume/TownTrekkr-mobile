import {BASE_URL, LOCAL_URL} from './config';

export const login = async (email, password) => 
{
    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      console.log(data);
      return data;

    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };
  
export const signup = async (email, password, username) => 
{
  try {
    const response = await fetch(`${BASE_URL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username }),
    });
    
    const data = await response.json();

    if (response.ok) 
      return data;
    else 
      return null;

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

    const response = await fetch(`${BASE_URL}/town/createtown`, {
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

export const addUserToTown = async (town_id, user_id) =>
{
  try {
    const response = await fetch(`${BASE_URL}/town/adduser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ town_id, user_id }),
    });

    const data = await response.json();
    if (data.message) { return true; }
    else { return false; }

  } catch (error) {
    console.error('Error adding user to town: ', error);
    throw error;
  }
};

export const removeUserFromTown = async (town_id, user_id) =>
{
  try {
    console.log(town_id, user_id);
    const response = await fetch(`${BASE_URL}/town/removeUser`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ town_id, user_id }),
    });

    const data = await response.json();
    console.log(data);
    if (data.message) { return true; }
    else { return false; }

  } catch (error) {
    console.error('Error removing user to town: ', error);
    throw error;
  }
  }

export const getTowns = async (userId, page = 1, limit = 20) => {
  try {
    let url = `${BASE_URL}/town/gettowns?page=${page}&limit=${limit}`;
    
    // append userId as query parameter, if it it exists
    if (userId) {
      url += `&userId=${userId}`;
    }
    // console.log("UserID in getTowns call:" + userId);

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

export const getUserById = async (userId) =>
{
  try {
    const response = await fetch(`${BASE_URL}/user/getuserbyid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();
    console.log(data);
    if (data) { return data; }
    else { return null; }
  } catch (error) {
    console.error(error);
  }
}

export const deleteTown = async (town_id) =>
{
  try {
    const response = await fetch(`${BASE_URL}/town/deletetown`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ town_id }),
    });
  
    const data = await response.json();
    if (data.message) { return true; }
    else { return false; }
  } catch (error) {
    console.error("Error deleting town: ", error);
  }
}

export const sendEmail = async (email) => {
  try {
    let url = `${BASE_URL}/user/sendemail`;
    

    // console.log("UserID in getTowns call:" + userId);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const verifyAccount = async (email, code) => {
  try {
    let url = `${BASE_URL}/user/verify`;
    

    // console.log("UserID in getTowns call:" + userId);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, code}),
    });

    const data = await response.json();

    if (response.ok) {
      return data.message === "User has been verified";
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error verifying account:', error);
    throw error;
  }
};