// Package Imports 
import axios from "axios";
import { GET_PHOTO_KEY_URL } from "../constants";


export const getUserId = () =>
{
    return localStorage.getItem('userID')?.replace(/['"]+/g, '')
};

export const getPhotoKeys = async () =>
{
    // get user id 
    const accountID = getUserId();
    const photoKeys = []

    let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };

    let body = {accountID};

    const response = await axios.post(GET_PHOTO_KEY_URL, body, axiosConfig)

    for(let i = 0; i < response.data.body.length; i++)
    {
      // need to update this to account for pictures with profile picture in name
      if(!response.data.body[i].includes('profile_picture'))
      {
        photoKeys.push(response.data.body[i]);
      }
    }

    return photoKeys

}

export const getProfilePicture = async () =>
{
  
    let accountID = getUserId();
    accountID = `${accountID}/profile_picture`

    let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };

    let body = {accountID};

    

    const response = await axios.post(GET_PHOTO_KEY_URL, body, axiosConfig)

    if(response.data.body.length > 0)
    {
      // console.log(response.data.body.length)
      return response.data.body
    }
    else
      return 
}

// funciton to clean up what user attributes exist
export const sanitizeUserAttributes = async (userAttributes: any[]) =>
{

    let userAttributesHash = new Map<string, string>();

    userAttributes.map(user =>
    {
        userAttributesHash.set(user.Name, user.Value)
    })

    console.log(userAttributesHash)

    return userAttributesHash
}

export const renderWindow = async() =>
{
  if(window.innerWidth < 767)
    return true
  else
    return false
}