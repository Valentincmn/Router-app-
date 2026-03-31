import { useApp } from "@/contexts/app-context";
import { Stack, useRouter } from "expo-router";
import { Button, ScrollView } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { user, ready } = useApp();

  if (!ready) return null;

  return (
    <>
      <ScrollView style={{ flex: 1, padding: 24, justifyContent: "center" }}>
        <Stack.Screen options={{ title: "Accueil" }} />
        {user ? (
          <Button title="Mes tâches" onPress={() => router.push("/tasks")} />
        ) : (
          <Button title="Connexion" onPress={() => router.push("/login")} />
        )}
      </ScrollView>
    </>
  );
}
