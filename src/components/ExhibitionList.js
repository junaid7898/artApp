import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const ExhibitionList = ({ image, name, price, product, likes, artist }) => {
  return (
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
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{name}</Text>

          <Text style={{ fontSize: 10, color: 'orange' }}>Price: {price}</Text>
          <Text>rating</Text>
        </View>
        {/* <Button
          title=""
          type="clear"
          icon={
            <AntDesign
              name="delete"
              size={30}
              color="red"
              onPress={() => {
                onDelete(product);
              }}
            />
          }
        /> */}
      </View>
    </View>
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

export default ExhibitionList;
