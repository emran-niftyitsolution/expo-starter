import { Redirect } from "expo-router";
import React from "react";

const RootScreen = () => {
  return <Redirect href={"/sign-in"} />;
};

export default RootScreen;
