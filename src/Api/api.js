import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://dd6f3d5d2df5.ngrok.io', //2309
});

export default instance;
