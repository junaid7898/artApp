import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Context as ProductContext } from '../../context/productContext';
import { CheckBox, Input, Button } from 'react-native-elements';
import { ExhibitionList } from '../../components/ExhibitionList';

const ExhibitionScreen = () => {
  const { state, getPaintingExhibition, getPictureData, getPictureExhibition } =
    useContext(ProductContext);
  const [iconCheckPainting, setIconCheckPainting] = useState(true);
  const [iconCheckPicture, setIconCheckPicture] = useState(false);
  const [check, setCheck] = useState('painting');
  const paintingCheck = () => {
    setIconCheckPainting(true);
    setCheck('buyer');
    setIconCheckPicture(false);
  };
  const pictureCheck = () => {
    setIconCheckPicture(true);
    setCheck('artist');
    setIconCheckPainting(false);
  };
  useEffect(() => {
    getPaintingExhibition();
    getPictureExhibition();
  }, []);
  return (
    <>
      <View>
        <View style={styles.checkbox}>
          <CheckBox
            title="Paintings"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={iconCheckPainting}
            onIconPress={paintingCheck}
          />
          <CheckBox
            title="Pictures"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            onIconPress={pictureCheck}
            checked={iconCheckPicture}
          />
        </View>
        {iconCheckPainting ? (
          <ScrollView contentContainerStyle={styles.container}>
            <View>
              <FlatList
                data={state.paintingExhibition}
                renderItem={({ item }) => (
                  <View>
                    {console.log(`flag: ${item.name}`)}
                    <ExhibitionList
                      key={item._id}
                      product={item._id}
                      artist={item.artist}
                      name={item.name}
                      image={item.image}
                      price={item.price}
                      likes={item.likes}
                    />
                  </View>
                )}
                numColumns={2}
                keyExtractor={(item, index) => index}
              />
            </View>
          </ScrollView>
        ) : (
          <Text>these are images</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 50,
    marginRight: 50,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
});

export default ExhibitionScreen;
