import { useApp } from "@/contexts/app-context";
import { Redirect, useRouter } from "expo-router";
import { Button, ScrollView, Text, View } from "react-native";

export default function TasksScreen() {
  const { user, ready, myTasks } = useApp();
  const router = useRouter();

  if (!ready) return null;
  if (!user) return <Redirect href="/login" />;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 24,
          gap: 12,
          paddingBottom: 40,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={{ marginBottom: 12, marginTop: 12 }}>
          Bonjour {user.name}
        </Text>
        {myTasks.map((t) => (
          <Text key={t.id} style={{ marginVertical: 4 }}>
            • {t.title}
          </Text>
        ))}
        <Button
          title="Nouvelle tâche"
          onPress={() => router.push("/tasks/new")}
        />
        <Button title="Profil" onPress={() => router.push("/profile")} />
        <Button title="Déconnexion" onPress={() => router.push("/logout")} />
      </ScrollView>
    </View>
  );
}
