import { useApp } from "@/contexts/app-context";
import { Redirect, useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function ProfileScreen() {
  const { user, ready } = useApp();
  const router = useRouter();

  if (!ready) return null;
  if (!user) return <Redirect href="/login" />;

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center", gap: 8 }}>
      <Text>Nom : {user.name}</Text>
      <Text>Email : {user.email}</Text>
      <Button title="Retour tâches" onPress={() => router.back()} />
    </View>
  );
}
