import {
  ActivityIndicator,
  Image,
  ImageSource,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Link } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/theme";

import { useRestaurants } from "@/hooks/useRestaurants";

const RestaurantLIst = () => {
  const { data: restaurants = [], isLoading } = useRestaurants();

  if (isLoading)
    return (
      <View>
        <ActivityIndicator size="large" color={Colors["secondary"]} />
      </View>
    );

  return (
    <>
      {restaurants.map((item) => (
        <View key={item.id}>
          <Link href={`(modal)/(restaurant)/${item.id}`} asChild>
            <TouchableOpacity style={styles.card}>
              <Image source={item.image as ImageSource} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.desription} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
              <View style={styles.metadata}>
                <Ionicons
                  name="bicycle-outline"
                  size={16}
                  color={Colors["muted"]}
                />
                <Text style={styles.metadataText}>
                  ${item.deliveryFee.toFixed(2)}
                </Text>
                <Text style={styles.dot}>-</Text>
                <Text style={styles.metadataText}>
                  ${item.deliveryFee.toFixed(2)}
                </Text>
                <Text style={styles.dot}>-</Text>
                <Ionicons
                  name="happy-outline"
                  size={16}
                  color={Colors["muted"]}
                />
              </View>
            </TouchableOpacity>
          </Link>
        </View>
      ))}
    </>
  );
};

export default RestaurantLIst;

const styles = StyleSheet.create({
  card: {
    margin: 16,
    boxShadow: "0 4px 2px -2px rgba(0,0,0,.2)",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors["light"],
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  desription: {
    fontSize: 14,
    color: Colors["muted"],
  },
  metadata: {
    borderTopColor: Colors["light"],
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 10,
  },
  metadataText: {
    fontSize: 13,
    color: Colors["muted"],
  },
  dot: {
    color: "#999",
    fontSize: 13,
  },
});
