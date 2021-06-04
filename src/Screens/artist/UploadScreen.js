import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Context as AuthContext } from './../../context/authContext';
import { Context as ProductContext } from '../../context/productContext';
import ArtistProductList from '../../components/ArtistProductList';
import { ListItem } from 'react-native-elements/dist/list/ListItem';

const UploadScreen = ({ route, navigation }) => {
  const { state, getProduct, deleteProduct } = useContext(ProductContext);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const buttons = ['Upload Product', 'View Orders'];
  const { artist } = route.params;

  useEffect(() => {
    getProduct(artist);
  }, []);

  const deletep = (id) => {
    deleteProduct(id);
    getProduct(artist);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {state.productData.length > 0 ? (
        // state.productData.map((item) => {
        //   return (
        //     <View>
        //       <ArtistProductList
        //         key={item._id}
        //         product={item._id}
        //         image={item.image}
        //         name={item.name}
        //         price={item.price}
        //         onDelete={(id) => deletep(id)}
        //       />
        //     </View>
        //   );
        // })
        <FlatList
          data={state.productData}
          renderItem={({ item }) => (
            <View>
              <ArtistProductList
                key={item._id}
                product={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                onDelete={(id) => deletep(id)}
              />
            </View>
          )}
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      ) : (
        <Text>no products to show</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
});

export default UploadScreen;
