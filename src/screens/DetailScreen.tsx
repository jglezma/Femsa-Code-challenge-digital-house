import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/es';

const DetailScreen = () => {
  const route = useRoute();
  const item = route.params.item;
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.product}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.subtitle}>Detalles del producto:</Text>
      <Text style={styles.date}>Comprado el {moment(item.createdAt).locale('es').format('D [de] MMMM, YYYY')}</Text>
      <Text style={styles.subtitle}>Con esta compra acumulaste:</Text>
      <Text style={styles.points}>{item.points} puntos</Text>

      <View>
        <TouchableOpacity
          style={styles.buttonLarge}
          onPress={() => handleGoBack()}
          testID="Aceptar"
        >
          <Text style={styles.textLargeButton}>Aceptar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#CFD6FF',
    paddingTop: 100,
    marginBottom: 19,
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 10,
    alignSelf: 'center',
  },
  title: {
    fontFamily: "Avenir",
    fontWeight: "800",
    fontSize: 24,
    color: "#000000",
    margin: 20,
  },
  points: {
    fontFamily: "Avenir",
    fontWeight: "800",
    fontSize: 24,
    color: "#000000",
    lineHeight: 32.78,
    margin: 10,
    marginLeft: 20
  },
  subtitle: {
    fontFamily: "Avenir",
    fontWeight: "800",
    fontSize: 14,
    lineHeight: 19.12,
    color: "#9B9898",
    margin: 10,
    marginLeft: 20
  },
  date: {
    fontFamily: "Avenir",
    fontWeight: "800",
    fontSize: 16,
    lineHeight: 21.86,
    color: "#000000",
    margin: 10,
    marginLeft: 20
  },
  buttonLarge: {
    height: 50,
    backgroundColor: "#334FFA",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 20
  },
  textLargeButton: {
    fontFamily: "Avenir",
    fontWeight: "800",
    fontSize: 16,
    lineHeight: 21.86,
    color: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default DetailScreen;
