import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList } from 'react-native';
import ProductList from '../../components/ProductList';
import { Button } from 'react-native-elements';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import Grid from '@material-ui/core/Grid';

import { Context as ProductContext } from '../../context/productContext';
import { useNavigation } from '@react-navigation/core';

const ProductScreen = ({ navigation, route }) => {
  const [products, setProducts] = useState([]);
  const { state, getProducts, getProductsLike } = useContext(ProductContext);
  // const { state1 } = useContext(AuthContext);
  // console.log(state1.idB);

  const { buyer, email, city, country, zip, phone, shippingAddress } =
    route.params;
  // const { buyer1 } = route.initialParams;
  // console.log(`buyer: ${buyer1}`);
  // rerender(() => {
  //   getProducts();
  //   setProducts(state.productsData);
  // });

  useEffect(() => {
    getProducts();
    setProducts(state.productsData);
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        data={state.productsData}
        renderItem={({ item }) => (
          <View>
            <ProductList
              key={item._id}
              product={item._id}
              buyer={buyer}
              email={email}
              city={city}
              country={country}
              zip={zip}
              phone={phone}
              shippingAddress={shippingAddress}
              artist={item.artist}
              name={item.name}
              image={item.image}
              price={item.price}
              likes={item.likes}
              likesMethod={getProductsLike}
              reRender={() => {
                getProducts();
                setProducts(state.productsData);
              }}
            />
          </View>
        )}
        numColumns={2}
        keyExtractor={(item, index) => index}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    width: 360,
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
});

export default ProductScreen;

{
  /* {state.productsData.map((item) => {
        return (
          <View>
            <ProductList
              key={item._id}
              product={item._id}
              buyer={buyer}
              email={email}
              city={city}
              country={country}
              zip={zip}
              phone={phone}
              shippingAddress={shippingAddress}
              artist={item.artist}
              name={item.name}
              image={item.image}
              price={item.price}
              likes={item.likes}
              likesMethod={getProductsLike}
            />
          </View>
        );
      })} */
}
