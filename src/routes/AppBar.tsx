import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { WorkoutFoldersStack } from "./WorkoutFoldersStack";
import { Icon, useTheme, Appbar } from "react-native-paper";
import { Snackbar } from "../components/Notifications/Snackbar/Snackbar";
import { SettingsScreenStack } from "./SettingsStack";
import { useContext, useEffect } from "react";
import { AppThemeContext } from "../contexts/AppThemeContext";
import { theme as savedThemes } from "../theme/theme";
import storage from "../utils/storage";

const Tab = createBottomTabNavigator();

export const AppBottomTab = () => {
  const theme = useTheme();

  const appThemeContext = useContext(AppThemeContext);
  useEffect(() => {
    const setPreferredTheme = async () => {
      const stored = await storage.get("preferredTheme");
      if (!stored) {
        return;
      }
      const scheme = JSON.parse(stored);
      if (scheme === "light") {
        appThemeContext.setTheme(savedThemes.light);
      } else if (scheme === "dark") {
        appThemeContext.setTheme(savedThemes.dark);
      }
    };
    setPreferredTheme()
  }, []);

  return (
    <>
      <Appbar.Header
        theme={theme}
        style={{
          borderBottomColor: theme.colors.outline,
          borderBottomWidth: 1,
        }}
      >
        <Appbar.Content title="App name" />
        <Appbar.Action icon="menu" />
      </Appbar.Header>
      <Snackbar />
      <Tab.Navigator
        initialRouteName="WorkoutFoldersTab"
        screenOptions={() => {
          return {
            tabBarStyle: {
              backgroundColor: theme.colors.background,
              borderTopColor: theme.colors.primary,
              borderTopWidth: 1,
            },
            tabBarActiveTintColor: theme.colors.primary,
          };
        }}
      >
        <Tab.Screen
          name="WorkoutFoldersTab"
          component={WorkoutFoldersStack}
          options={{
            tabBarLabel: "Workouts",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon source={"folder"} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsTab"
          component={SettingsScreenStack}
          options={{
            tabBarLabel: "Settings",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon source={"cog"} color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};
