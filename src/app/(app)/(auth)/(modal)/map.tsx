import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as Location from "expo-location";
import { Link, useRouter } from "expo-router";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import {
  Camera,
  CameraRef,
  Map,
  Marker,
} from "@maplibre/maplibre-react-native";

import { Colors } from "@/constants/theme";

import { useRestaurantMarkers, useRestaurants } from "@/hooks/useRestaurants";

const MapModal = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  const router = useRouter();
  const insets = useSafeAreaInsets();

  const cameraRef = useRef<CameraRef>(null);

  const { data: restaurants = [], isLoading: isRestaurantsLoading } =
    useRestaurants();

  const { data: restMarkers = [], isLoading: isMarkesLoading } =
    useRestaurantMarkers();

  const markers = restMarkers.map((marker) => ({
    id: marker.id,
    lat: marker.latitude,
    long: marker.longitude,
    name: marker.name,
  }));

  const handleLocate = () => {
    if (!location) return;

    cameraRef.current?.setStop({
      center: [location.coords.longitude, location.coords.latitude],
      zoom: 14,
      duration: 800,
      easing: "ease",
    });
  };

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          console.log("Location permission denied");
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setLocation(currentLocation);
      } catch (error) {
        console.error("failed to get location: ", error);
      }
    };

    getLocation();
  }, []);

  if (isMarkesLoading || isRestaurantsLoading)
    return (
      <View>
        <ActivityIndicator size="large" color={Colors["secondary"]} />
      </View>
    );

  return (
    <>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.dismiss()}
        >
          <Ionicons name="chevron-back" size={22} color={Colors["muted"]} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <Link href="/(app)/(auth)/(modal)/filter" asChild>
            <TouchableOpacity style={styles.backBtn}>
              <Ionicons name="filter" size={20} />
            </TouchableOpacity>
          </Link>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={handleLocate}
            disabled={!location}
          >
            <Ionicons name="locate-outline" size={22} color={Colors["muted"]} />
          </TouchableOpacity>
        </View>
      </View>
      <Map
        style={{ flex: 1 }}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
      >
        {location && (
          <Camera
            ref={cameraRef}
            initialViewState={{
              center: [location.coords.longitude, location.coords.latitude],
              zoom: 14,
            }}
          />
        )}

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            id={String(marker.id)}
            lngLat={[marker.long, marker.lat]}
            anchor="bottom"
            onPress={() => router.push(`/(modal)/(restaurant)/${marker.id}`)}
          >
            <TouchableOpacity
              style={{
                width: 36,
                height: 36,
                borderRadius: 21,
                backgroundColor: Colors["muted"],
                borderWidth: 1,
                borderColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: "#fff", fontSize: 14, textAlign: "center" }}
              >
                R
              </Text>
            </TouchableOpacity>
          </Marker>
        ))}
      </Map>
      <View style={styles.footerScroll}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {restaurants?.map((restaurant) => (
            <TouchableOpacity
              key={restaurant.id}
              style={styles.card}
              onPress={() =>
                router.push(`/(modal)/(restaurant)/${restaurant.id}`)
              }
            >
              <Image source={restaurant.image!} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {restaurant.name}
                  </Text>
                  {restaurant.tags.includes("Wolt+") && (
                    <View style={styles.woltBadge}>
                      <Text style={styles.woltBadgeText}>W+</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.cardDescription} numberOfLines={1}>
                  {restaurant.description}
                </Text>
                <View style={styles.cardFooter}>
                  <Ionicons name="bicycle-outline" size={14} color="#666" />
                  <Text style={styles.cardFooterText}>
                    {restaurant.deliveryFee === 0
                      ? "Free delivery"
                      : `${restaurant.deliveryFee.toFixed(2)} €`}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default MapModal;

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 16,
    right: 16,
    zIndex: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 40,
    height: 40,
    backgroundColor: Colors["background"],
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
  },
  iconBtn: {
    width: 40,
    height: 40,
    backgroundColor: Colors["light"],
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  footerScroll: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingBottom: 20,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
    marginVertical: 16,
  },
  card: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 16,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
    flexDirection: "row",
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    margin: 10,
  },
  cardContent: {
    flex: 1,
    padding: 12,
    paddingLeft: 0,
    justifyContent: "center",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    flex: 1,
  },
  woltBadge: {
    backgroundColor: "#009de0",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  woltBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
  },
  cardDescription: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardFooterText: {
    fontSize: 12,
    color: "#666",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
