import { ScrollView, StyleSheet, Text } from "react-native";

const ProfileTab = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
    >
      <Text>ProfileTab</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ProfileTab;
