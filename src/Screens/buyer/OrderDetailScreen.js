import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Context as OrderContext } from '../../context/orderContext';
import { Card } from 'react-native-elements';
import { AsyncStorage } from 'react-native';

const OrderDetailScreen = ({ route, navigation }) => {
  const { state, getOrder } = useContext(OrderContext);

  // const buyer = AsyncStorage.getItem('bID');
  // console.log('here it is:');
  // console.log(buyer);

  // const { buyer } = route.params;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // getOrder('60525a6b0d9d4837a0013a9e');
    var buyer = '';

    const bidf = async () => {
      const buyer1 = await AsyncStorage.getItem('bID');
      console.log('here it is:');
      // buyer = JSON.parse(b);
      // buyer = buyer1.toString();
      console.log(buyer1);
      getOrder(buyer1);
      buyer = buyer1;
      console.log(buyer);
      return buyer1;
      // await AsyncStorage.removeItem('bID');
    };
    bidf();
    setOrders(state.orderedData);
  }, []);

  return (
    <ScrollView>
      {/* <Text>{state.orderedData[0].shipmentAddress}</Text> */}
      {state.orderedData.map((item) => {
        return (
          <Card>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>product ID:</Text>{' '}
              {item.product}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Shipment Address:</Text>{' '}
              {item.shippingAddress}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>City:</Text> {item.city}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Country:</Text>{' '}
              {item.country}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Zip:</Text> {item.zip}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Date Ordered:</Text>{' '}
              {item.dateOrdered}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Buyer Email:</Text>{' '}
              {item.email}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Buyer Phone:</Text>{' '}
              {item.phone}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Order Status:</Text>{' '}
              <Text style={{ color: 'red' }}>{item.status}</Text>
            </Text>
          </Card>
        );
      })}
    </ScrollView>
  );
};

export default OrderDetailScreen;
