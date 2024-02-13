import { useState } from "react";
import { FAB, Portal, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types";

interface WorkoutFolderFabGroupProps {
  visible: boolean;
}

export const WorkoutFolderFabGroup = ({ visible }: WorkoutFolderFabGroupProps) => {
  const [state, setState] = useState({ open: false });
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        style={styles.fabStyle}
        testID="workout-folder-fab-group"
        open={open}
        visible={visible}
        icon={open ? "close" : "folder-edit"}
        actions={[
          {
            icon: "delete",
            label: "Delete",
            onPress: () => console.log("Delete"),
            color: theme.colors.error,
          },
          {
            icon: "rename-box",
            label: "Rename folder",
            onPress: () => console.log("Rename"),
          },
          {
            icon: "plus-circle",
            label: "Edit Exercises",
            onPress: () => navigation.navigate("AddExercises"),
          },
        ]}
        onStateChange={onStateChange}
      />
    </Portal>
  );
};

const styles = StyleSheet.create({
  fabStyle: {
    position: "absolute",
    bottom: 50,
  },
});
