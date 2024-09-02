import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import GoogleColoredLogo from "../../../../assets/svgs/GoogleColoredLogo";
import CustomButton from "../../../../components/buttons/CustomButton";
import InputField from "../../../../components/forms/InputField";

interface LoginFormInputs {
  email: string;
  password: string;
  age: string;
}

export default function SignInForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <View className="mt-5">
      <InputField
        control={control}
        name="email"
        label="Email Address"
        placeholder="Enter your email"
        type="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Please enter a valid email address",
          },
        }}
      />
      <InputField
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        type="password"
        secureTextEntry={!isPasswordVisible}
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
        }}
        rightIcon={() => (
          <Feather
            name={isPasswordVisible ? "eye-off" : "eye"}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            size={24}
          />
        )}
      />
      <View className="flex-row space-x-3">
        <InputField control={control} name="remember" type="checkbox" />
        <Text className="text-gray-600">Keep me signed in </Text>
      </View>
      <InputField
        control={control}
        name="submit"
        type="submit"
        label="Login"
        onSubmit={handleSubmit(onSubmit)}
      />
      <View className="flex-row items-center space-x-3">
        <View className="h-[1px] grow bg-gray-300"></View>
        <Text className="grow-0 text-gray-500">or sign in with</Text>
        <View className="h-[1px] grow bg-gray-300"></View>
      </View>

      <CustomButton
        title="Continue with Google"
        className="bg-gray-200"
        titleStyle="text-gray-600"
        leftIcon={() => <GoogleColoredLogo width={24} height={24} />}
      />

      <Link
        href="/sign-up"
        className="mt-10 text-center font-bold text-blue-600"
      >
        Don't have an account? Sign up
      </Link>
    </View>
  );
}
