import { Tabs } from "expo-router";

import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="restaurants"
        options={{
          title: "Restaurants",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="restaurant"
              size={size}
              color={color as string}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="discovery"
        options={{
          title: "discovery",
          headerShown: true,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "compass" : "compass-outline"}
              size={size}
              color={color as string}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="stores"
        options={{
          title: "Stores",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "storefront" : "storefront-outline"}
              size={size}
              color={color as string}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: true,
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name={focused ? "search-location" : "search"}
              size={size}
              color={color as string}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={"person"} size={size} color={color as string} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
