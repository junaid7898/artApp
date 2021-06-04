import React, { useState, useContext, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';

const BuyerPaintingList = ({
  image,
  name,
  price,
  painting,
  likes,
  likesMethod,
  reRender,
}) => {
  const [like, setLike] = useState('hearto');
  const [likeColor, setLikeColor] = useState('black');
  // const [id, setId] = useState('')

  const buyerId = async () => {
    const buyer1 = await AsyncStorage.getItem('bID');
    // console.log('here it is:');

    // console.log(buyer1);
    // setId(buyer1)
    if (likes.includes(buyer1)) {
      setLike('heart');
      setLikeColor('red');
    }
  };

  useEffect(() => {
    buyerId();
    // console.log('runnnn');
  });

  const onPressLike = async () => {
    setLike('heart');
    setLikeColor('red');
    const buyer1 = await AsyncStorage.getItem('bID');
    likesMethod(painting, buyer1, likes.length);
    reRender();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity>
          <Image
            source={{ uri: image }}
            resizeMode="cover"
            style={styles.image}
          />
        </TouchableOpacity>
        {/* <View style={styles.title}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{name}</Text>

        <Text style={{ fontSize: 10, color: 'orange' }}>Price: {price}</Text>
        <Text>rating</Text>
      </View> */}
        <View style={styles.description}>
          <View style={styles.title}>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{name}</Text>

            {/* <Text style={{ fontSize: 10, color: 'orange' }}>Price: {price}</Text>
          <Text>rating</Text> */}
          </View>
          <View style={styles.like}>
            <Text style={{ marginTop: 10, marginRight: 5 }}>
              {likes.length}
            </Text>
            <Button
              title=""
              type="clear"
              icon={
                <AntDesign
                  name={like}
                  size={25}
                  color={likeColor}
                  onPress={onPressLike}
                />
              }
            />
          </View>
          {/* <Text>{key}</Text> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 10,
    marginRight: 5,
    marginLeft: 9,
  },
  image: {
    width: 170,
    height: 200,

    marginBottom: 5,
  },
  title: {
    padding: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderBottomColor: '#4C423F',
    // borderBottomWidth: 3,
  },
  description: {
    flexDirection: 'column',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#4C423F',
    borderBottomWidth: 3,
  },
  like: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default BuyerPaintingList;
