import { useApp } from "@/contexts/app-context";
import { Redirect, useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function LogoutScreen() {
  const { user, ready, logout } = useApp();
  const router = useRouter();

  if (!ready) return null;
  if (!user) return <Redirect href="/" />;

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center", gap: 12 }}>
      <Text>Déconnexion ?</Text>
      <Button
        title="Oui"
        onPress={() => {
          logout();
          router.replace("/");
        }}
      />
    </View>
  );
}
