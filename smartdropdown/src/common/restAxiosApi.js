import axios from 'axios';
const SERVER = 'http://13.57.235.126:5000';

export async function getRequest(url){
    try{
        const response =  await axios.get(`${SERVER}${url}`);
        return response; 
    }catch(error){
        return error;
    }
  };

  