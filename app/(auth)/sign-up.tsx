import { View, Text, Button } from "react-native";
import React from "react";
import { router } from "expo-router";

const Signup = () => {
  return (
    <View>
      <Text>Signup</Text>
      <Button title="signin" onPress={() => router.push("/(auth)/sign-up")} />
    </View>
  );
};

export default Signup;
