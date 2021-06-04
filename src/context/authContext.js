import createDataContex from './createDataContext';
import { useNavigation } from '@react-navigation/native';
import instance from '../Api/api';
import axios from 'axios';
import * as rootNavigation from '../rootNavigation';
import { AsyncStorage } from 'react-native';
// const navigation = useNavigation();
const authReducer = (state, action) => {
  switch (action.type) {
    case 'error_message':
      return { ...state, errorMessage: action.payload };
    case 'login_A':
      return { ...state, idA: action.payload, errorMessage: '' };
    case 'login_B':
      return { ...state, idB: action.payload, errorMessage: '' };
    default:
      return state;
  }
};

//http://7e6d36a9ba6b.ngrok.io
//http://7e6d36a9ba6b.ngrok.io
const signupA =
  (dispatch) =>
  async ({ name, username, password }) => {
    try {
      const response = await instance.post(`/api/v1/artist`, {
        name,
        username,
        password,
      });
      console.log(response.data);
      rootNavigation.navigate('Login', {});
    } catch (error) {
      console.log('username already exists');
      dispatch({ type: 'buyer_error', payload: 'username already exists' });
    }
  };

const signupB =
  (dispatch) =>
  async ({
    bname,
    busername,
    bpassword,
    email,
    city,
    country,
    zip,
    phone,
    shippingAddress,
  }) => {
    try {
      const response = await instance.post('/api/v1/buyer', {
        bname,
        busername,
        bpassword,
        email,
        city,
        country,
        zip,
        phone,
        shippingAddress,
      });
      console.log(response.data);

      dispatch({ type: 'error_message', dispatch: response.data.message });

      if (response.data._id) {
        // dispatch({ type: 'buyer_signup', dispatch: response.data._id });
        rootNavigation.navigate('Login', {});
      }
    } catch (err) {
      console.log(err.message);
    }
  };

const loginB = (dispatch) => async (username, password) => {
  try {
    console.log('here abc');
    const response = await instance.post('/api/v1/buyer/login', {
      username,
      password,
    });
    if (response.data.message == 'invalid username or password') {
      dispatch({
        type: 'error_message',
        payload: 'invalid username or password',
      });
      console.log('invalidity');
    }
    console.log(response.data);
    if (response.data._id) {
      console.log(response.data._id);

      await AsyncStorage.setItem('bID', response.data._id);
      const token = await AsyncStorage.getItem('bID');
      console.log(`token: ${token}`);
      // await AsyncStorage.removeItem('bID');

      dispatch({ type: 'login_B', payload: response.data._id });
      // console.log('hell');
      // console.log(response.data._id);

      rootNavigation.navigate('Home', {
        screen: 'Product',
        params: {
          buyer: response.data._id,
          email: response.data.email,
          city: response.data.city,
          country: response.data.country,
          zip: response.data.zip,
          phone: response.data.phone,
          shippingAddress: response.data.shippingAddress,
        },
        initialParams: {
          buyer: response.data._id,
        },
      });
      console.log('navigated to home');
    }
  } catch (error) {
    console.log('error');
    console.log(error.message);
  }
};

const loginA = (dispatch) => async (username, password) => {
  try {
    console.log('here');
    const response = await instance.post('/api/v1/artist/login', {
      username: username,
      password: password,
    });
    if (response.data.message == 'invalid username or password') {
      dispatch({
        type: 'error_message',
        payload: 'invalid username or password',
      });
      console.log('invalid username or password');
    }
    if (response.data._id) {
      await AsyncStorage.setItem('bID', response.data._id);
      const token = await AsyncStorage.getItem('bID');
      console.log(`tokenArtist: ${token}`);
      console.log(response.data._id);
      dispatch({ type: 'login_A', payload: response.data._id });
      rootNavigation.navigate('ArtistHome', {
        screen: 'Upload',
        params: { artist: response.data._id },
      });
    }
  } catch (error) {
    console.log('error');
    console.log(error.message);
  }
};

export const { Provider, Context } = createDataContex(
  authReducer,
  { signupA, signupB, loginA, loginB },
  { errorMessage: '', idA: '', idB: '' }
);
