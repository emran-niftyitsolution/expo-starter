import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthLayout = () => {
  return (
    <SafeAreaView className="flex-1">
      <Slot />
    </SafeAreaView>
  );
};

export default AuthLayout;
