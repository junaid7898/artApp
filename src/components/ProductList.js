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

import { Context as OrderContext } from '../context/orderContext';
import { AntDesign } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const ProductList = ({
  image,
  price,
  name,
  product,
  buyer,
  artist,
  phone,
  zip,
  shippingAddress,
  email,
  city,
  country,
  likes,
  likesMethod,
  reRender,
}) => {
  const [isAdded, setisAdded] = useState(false);
  const { state, setCart, setOrder } = useContext(OrderContext);
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
    const buyer1 = await AsyncStorage.getItem('bID');
    likesMethod(product, buyer1, likes.length);
    setLike('heart');
    setLikeColor('red');
    reRender();
  };

  return (
    // <Card>
    //   <Card.Title style={{ fontSize: 24 }}>{name}</Card.Title>
    //   <Card.Divider />

    //   <View style={styles.imageContainer}>
    //     <TouchableOpacity>
    //       <Image
    //         source={{ uri: image }}
    //         resizeMode="cover"
    //         style={styles.image}
    //       />
    //     </TouchableOpacity>
    //     <Text style={{ fontSize: 20, color: 'orange' }}>Price: {price}</Text>
    //     <Button
    //       title="Order item"
    //       type="clear"
    //       titleStyle={{ fontSize: 24 }}
    //       disabled={isAdded}
    //       onPress={() => {
    //         setisAdded(true);
    //         setCart(name, image, price);
    //         setOrder(
    //           buyer,
    //           product,
    //           artist,
    //           shippingAddress,
    //           city,
    //           zip,
    //           country,
    //           phone,
    //           email
    //         );
    //       }}
    //     />
    //   </View>
    // </Card>
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity>
          <Image
            source={{ uri: image }}
            resizeMode="cover"
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.description}>
          <View style={styles.title}>
            {/* <Text>{product}</Text> */}
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{name}</Text>

            {/* <Text style={{ fontSize: 10, color: 'orange' }}>
              Price: {price}
            </Text>
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
  // imageContainer: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // image: {
  //   width: 300,
  //   height: 300,
  //   borderRadius: 10,
  //   marginBottom: 10,
  // },
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

export default ProductList;
