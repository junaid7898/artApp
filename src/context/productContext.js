import createDataContex from './createDataContext';
import instance from '../Api/api';
import * as rootNavigation from '../rootNavigation';

const productReducer = (state, action) => {
  switch (action.type) {
    case 'insert_products':
      return { ...state, productsData: action.payload };
    case 'insert_paintings':
      return { ...state, paintingsData: action.payload };
    case 'get_product':
      return { ...state, productData: action.payload };
    case 'get_painting':
      return { ...state, paintingData: action.payload };
    case 'get_painting_exhibition':
      return { ...state, paintingExhibition: action.payload };
    case 'get_picture_exhibition':
      return { ...state, pictureExhibition: action.payload };
    default:
      return state;
  }
};

const getProducts = (dispatch) => async () => {
  try {
    const response = await instance.get('/api/v1/product');

    dispatch({ type: 'insert_products', payload: response.data });
    console.log(response.data);
  } catch (error) {
    console.log('main error');
    console.log(error.message);
  }
};

const getPaintings = (dispatch) => async () => {
  try {
    const response = await instance.get('/api/v1/painting');

    dispatch({ type: 'insert_paintings', payload: response.data });
    console.log(response.data);
  } catch (error) {
    console.log('main error');
    console.log(error.message);
  }
};

const getProductsLike = (dispatch) => async (id, buyerId, likes) => {
  try {
    const response = await instance.put('/api/v1/product/like', {
      id: id,
      buyerId: buyerId,
      number: likes,
    });

    // dispatch({ type: 'insert_products', payload: response.data });
    console.log(response.data);
  } catch (error) {
    console.log('main error');
    console.log(error.message);
  }
};

const getPaintingsLike = (dispatch) => async (id, buyerId, likes) => {
  try {
    console.log('ttttttttttttttttttt');
    const response = await instance.put('/api/v1/painting/like', {
      id: id,
      buyerId: buyerId,
      number: likes,
    });

    // dispatch({ type: 'insert_products', payload: response.data });
    console.log(response.data);
  } catch (error) {
    console.log('main error');
    console.log(error.message);
  }
};
const uploadProduct = (dispatch) => async (formData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  try {
    const response = await instance.post('/api/v1/product', formData, config);
    console.log('product uploaded');
    console.log(response.data);
    rootNavigation.navigate('Upload', {});
  } catch (error) {
    console.log('error happened');
  }
};

const uploadPainting = (dispatch) => async (formData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  try {
    const response = await instance.post('/api/v1/painting', formData, config);
    console.log('painting uploaded');
    console.log(response.data);
    rootNavigation.navigate('Upload', {});
  } catch (error) {
    console.log('error happened');
  }
};

const getProduct = (dispatch) => async (artist) => {
  try {
    const id = artist.toString();
    const response = await instance.get(`/api/v1/product/${id}`);
    console.log(response.data);
    dispatch({ type: 'get_product', payload: response.data });
  } catch (error) {
    console.log('error happened');
  }
};

const getPainting = (dispatch) => async (artist) => {
  try {
    const id = artist.toString();
    const response = await instance.get(`/api/v1/painting/${id}`);
    console.log(response.data);
    dispatch({ type: 'get_painting', payload: response.data });
  } catch (error) {
    console.log('error happened');
  }
};
const getPaintingExhibition = (dispatch) => async () => {
  try {
    const response = await instance.get(`/api/v1/painting/exhibition`);
    console.log(response.data);
    dispatch({ type: 'get_painting_exhibition', payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

const getPictureExhibition = (dispatch) => async () => {
  try {
    const response = await instance.get(`/api/v1/product/exhibition`);
    console.log(response.data);
    dispatch({ type: 'get_picture_exhibition', payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = (dispatch) => async (product) => {
  try {
    const id = product.toString();
    await instance
      .delete(`/api/v1/product/${id}`)
      .then((res) => {
        console.log('item deleted successfully');
      })
      .catch((err) => console.log('errorHappened'));
  } catch (error) {
    console.log('big error ');
  }
};

const deletePainting = (dispatch) => async (product) => {
  try {
    const id = product.toString();
    await instance
      .delete(`/api/v1/painting/${id}`)
      .then((res) => {
        console.log('item deleted successfully');
      })
      .catch((err) => console.log('errorHappened'));
  } catch (error) {
    console.log('big error ');
  }
};

export const { Provider, Context } = createDataContex(
  productReducer,
  {
    getProducts,
    uploadProduct,
    uploadPainting,
    getProduct,
    getPainting,
    getPaintings,
    deleteProduct,
    deletePainting,
    getProductsLike,
    getPaintingsLike,
    getPaintingExhibition,
    getPictureExhibition,
  },
  {
    productsData: [],
    productData: [],
    paintingData: [],
    paintingsData: [],
    paintingExhibition: [],
    pictureExhibition: [],
  }
);
