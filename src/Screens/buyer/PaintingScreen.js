import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Context as AuthContext } from './../../context/authContext';
import { Context as ProductContext } from '../../context/productContext';
import BuyerPaintingList from '../../components/BuyerPaintingList';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import { AsyncStorage } from 'react-native';

const PaintingScreen = ({ route, navigation }) => {
  const { state, getPaintings, getPaintingsLike } = useContext(ProductContext);
  const [selectedIndex, setSelectedIndex] = useState(1);

  // const { artist } = route.params;

  useEffect(() => {
    const bidf = async () => {
      const buyer = await AsyncStorage.getItem('bID');
      console.log('here it is:');

      console.log(buyer);
      getPaintings(buyer);
    };
    bidf();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        {state.paintingsData.length > 0 ? (
          // state.paintingsData.map((item) => {
          //   return (
          //     <View>
          //       <BuyerPaintingList
          //         key={item._id}
          //         painting={item._id}
          //         image={item.image}
          //         name={item.name}
          //         price={item.price}
          //         likes={item.likes}
          //         likesMethod={getPaintingsLike}
          //       />
          //     </View>
          //   );
          // })
          <FlatList
            data={state.paintingsData}
            renderItem={({ item }) => (
              <View>
                <BuyerPaintingList
                  key={item._id}
                  painting={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  likes={item.likes}
                  likesMethod={getPaintingsLike}
                  reRender={() => bidf()}
                />
              </View>
            )}
            numColumns={2}
            keyExtractor={(item, index) => index}
          />
        ) : (
          <Text>no paintings to show </Text>
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

export default PaintingScreen;
