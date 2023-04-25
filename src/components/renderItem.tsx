import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/es';

const pointsDecimal = (points) => {
  const parts = points.toString().split(".");
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const decimalPart = parts[1] ? `.${parts[1]}` : "";
  return `${integerPart}${decimalPart}`
}

const RenderItem = ({ item }) => {

  const navigation = useNavigation();
  const handlePress = (item) => {
    navigation.navigate('Detail', { item });
  };
  return (
    <TouchableOpacity style={styles.container}
    onPress={()=> handlePress(item)}
    testID="item">
      <Image source={{ uri: item.image }} style={styles.image} />
      <View>
        <Text style={styles.title}>{item.product}</Text>
        <Text style={styles.date}>{moment(item.createdAt).locale('es').format('D [de] MMMM, YYYY')}</Text>
      </View>
      <View style={styles.rows}>
        <Text style={styles.number}>
          {item.is_redemption ? (
            <Text style={[styles.number, {color: '#FF0000'}]}>-</Text>
              ) : (
            <Text style={[styles.number, {color: '#00B833'}]}>+</Text>
            )
          }{pointsDecimal(item.points)}
        </Text>
        <Text style={styles.number}>  ></Text>
      </View>
    </TouchableOpacity>
)};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
  },
  rows: {
    flexDirection: "row",
    flex: 1,
    justifyContent: 'flex-end'
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 10,
    marginRight: 16
  },
  title: {
    fontFamily: "Avenir",
    fontWeight: "800",
    fontSize: 14,
    lineHeight: 19.12,
    color: "#000000",
  },
  date: {
    fontFamily: "Avenir",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16.39,
    color: "#000000",
  },
  number: {
    fontFamily: "Avenir",
    fontWeight: "800",
    fontSize: 16,
    lineHeight: 21.86,
    color: "#000000",
    marginTop: 9,
  },
});

export default RenderItem;
