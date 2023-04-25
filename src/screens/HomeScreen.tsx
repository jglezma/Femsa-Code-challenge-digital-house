import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import RenderItem from "../components/renderItem";

const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const HomeScreen = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state?.products.data);
  const falseProducts = useSelector((state) => state?.products.data).filter(
    (product) => product.is_redemption === false
  );
  const trueProducts = useSelector((state) => state?.products.data).filter(
    (product) => product.is_redemption === true
  );
  const isLoading = useSelector((state) => state?.products.isLoading);
  const error = useSelector((state) => state?.products.error);
  const [points, usePoints] = useState("");
  const [filterProducts, usefilterProducts] = useState();
  const [all, useAll] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    usefilterProducts(products);
    const sum = products.reduce(
      (acc: number, item: { points: number; is_redemption: boolean }) => {
        if (!item.is_redemption) {
          acc += item.points;
        }
        return acc;
      },
      0
    );
    const parts = sum.toString().split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const decimalPart = parts[1] ? `.${parts[1]}` : "";
    usePoints(`${integerPart}${decimalPart}.00`);
  }, [products]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const handleSort = (opc) => {
    if (opc === "falseProducts") {
      usefilterProducts(falseProducts);
      useAll(true);
    } else if (opc === "trueProducts") {
      usefilterProducts(trueProducts);
      useAll(true);
    } else {
      usefilterProducts(products);
      useAll(false);
    }
  };

  const fecha = new Date();
  const mesActual = meses[fecha.getMonth()];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido de vuelta!</Text>
      <Text style={styles.name}>Ruben Rodriguez</Text>
      <Text style={styles.point}>TUS PUNTOS</Text>
      <View style={[styles.canje, stylesShadow.shadow]}>
        <Text style={styles.actualMes}>{mesActual}</Text>
        <Text style={styles.points}>{points} pts</Text>
      </View>
      <Text style={styles.point}>TUS MOVIMIENTOS </Text>
      <View style={styles.viewFlat}>
        <FlatList
          data={filterProducts}
          renderItem={({ item }) => <RenderItem item={item} />}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={(item) => item.id}
        />
      </View>
      {all ? (
        <View>
          <TouchableOpacity
            style={styles.buttonLarge}
            onPress={() => handleSort("all")}
          >
            <Text style={styles.textLargeButton}>Todo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonConteiner}>
          <TouchableOpacity
            style={styles.buttonMedium}
            onPress={() => handleSort("falseProducts")}
          >
            <Text style={styles.textButton}>Ganados</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonMedium}
            onPress={() => handleSort("trueProducts")}
          >
            <Text style={styles.textButton}>Canjeados</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const stylesShadow = {
  shadow: Platform.select({
    ios: {
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
  }),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    padding: 20,
  },
  title: {
    fontFamily: "Avenir",
    fontWeight: "800",
    fontSize: 20,
    lineHeight: 27.32,
    color: "#020202",
  },
  name: {
    fontFamily: "Avenir",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 21.86,
    color: "#020202",
  },
  point: {
    fontFamily: "Avenir",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19.12,
    color: "#9B9898",
    marginVertical: 20,
  },
  points: {
    fontFamily: "Avenir",
    fontWeight: "800",
    fontSize: 32,
    lineHeight: 43.71,
    color: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 7,
  },
  canje: {
    width: 286,
    height: 143,
    backgroundColor: "#334FFA",
    alignSelf: "center",
    borderRadius: 20,
  },
  actualMes: {
    fontFamily: "Avenir",
    fontWeight: "800",
    fontSize: 16,
    lineHeight: 21.86,
    color: "#FFFFFF",
    marginTop: 21,
    marginLeft: 17,
  },
  flatListContainer: {
    padding: 10,
  },
  viewFlat: {
    height: 320,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: 40,
  },
  buttonMedium: {
    height: 50,
    width: 170,
    backgroundColor: "#334FFA",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLarge: {
    height: 50,
    backgroundColor: "#334FFA",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    fontFamily: "Avenir",
    fontWeight: "800",
    fontSize: 12,
    lineHeight: 16.39,
    color: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
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
  buttonConteiner: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default HomeScreen;
