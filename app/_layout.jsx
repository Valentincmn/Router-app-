import { AppProvider } from "@/contexts/app-context";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="tasks" options={{ headerShown: false }} />
      </Stack>
    </AppProvider>
  );
}
