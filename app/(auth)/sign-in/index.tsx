import { Text, View } from "react-native";
import KeyboardAvoidingWrapper from "../../../components/keyboards/KeyboardAvoidingWrapper";
import SignInForm from "./components/signin-form";

const SignInScreen = () => {
  return (
    <KeyboardAvoidingWrapper>
      {/* <LinearGradient
        colors={["#f2fcfe", "#1caad2"]}
        style={{ flex: 1}}
      > */}
      <View className="p-5 pt-36">
        <View>
          <Text className="text-4xl font-bold">Login </Text>
          <Text className="mt-2 text-xl text-gray-500">
            Welcome back to the app{" "}
          </Text>
        </View>
        <SignInForm />
      </View>
      {/* </LinearGradient> */}
    </KeyboardAvoidingWrapper>
  );
};

export default SignInScreen;
