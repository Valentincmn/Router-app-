import { Stack } from "expo-router";

export default function TasksLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: "Retour",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Mes tâches" }} />
      <Stack.Screen name="new" options={{ title: "Nouvelle tâche" }} />
    </Stack>
  );
}
