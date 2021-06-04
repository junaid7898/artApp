import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Context as AuthContext } from './../../context/authContext';
import { Context as ProductContext } from '../../context/productContext';
import ArtistPaintingList from '../../components/ArtistPaintingList';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import { AsyncStorage } from 'react-native';

const PaintingScreenA = ({ route, navigation }) => {
  const { state, getProduct, deleteProduct, getPainting, deletePainting } =
    useContext(ProductContext);
  const [selectedIndex, setSelectedIndex] = useState(1);

  // const { artist } = route.params;

  useEffect(() => {
    const bidf = async () => {
      const artist = await AsyncStorage.getItem('bID');
      console.log('here it is:');

      console.log(artist);
      getPainting(artist);
    };
    bidf();
  }, []);

  const deletep = (id) => {
    deletePainting(id);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        {state.paintingData.length > 0 ? (
          // state.paintingData.map((item) => {
          //   return (
          //     <View>
          //       <ArtistPaintingList
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
            data={state.paintingData}
            renderItem={({ item }) => (
              <View>
                <ArtistPaintingList
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
          <Text>no paintings to show to show</Text>
        )}
      </View>
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

export default PaintingScreenA;
