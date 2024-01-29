import React from "react";
import { ScreenProps } from "../interfaces";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Text, TextInput, useTheme, Button } from "react-native-paper";
import { PasswordInput } from "../components/PasswordInput";
import { SignInForm } from "../components/Auth/SignInForm";
import { DontHaveAnAccountButton } from "../components/Buttons/DontHaveAnAccountButton";

export const SignInEmailPasswordScreen = ({ navigation }: ScreenProps) => {
  const theme = useTheme();

  const goToChooseSignUpMethod = () => {
    navigation.navigate("SignUp");
  }

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.headingView}>
          <Text variant="titleMedium">Sign in to your account</Text>
        </View>

        <View
          style={styles.inputView}
        >
          <SignInForm />
        </View>

        <View style={styles.footerView}>
          <DontHaveAnAccountButton />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  inputView: {
    width: "100%",
    marginBottom: 20,
    flex: 1,
  },
  errorText: {
    color: "red",
    marginBottom: 20,
    padding: 5,
  },
  headingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
