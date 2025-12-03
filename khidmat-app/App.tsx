import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { PostsProvider } from "./src/context/PostsContext";

import HomeScreen from "./src/screens/HomeScreen";
import CreatePostScreen from "./src/screens/CreatePostScreen";
import PostDetailsScreen from "./src/screens/PostDetailsScreen";
import AcceptedVolunteersScreen from "./src/screens/AcceptedVolunteersScreen";

import { colors } from "./src/theme/colors";

export type RootStackParamList = {
  Home: undefined;
  CreatePost: undefined;
  Details: { postId: string };
  Accepted: { postId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const MyTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      primary: colors.gold,
    },
  };

  return (
    <PostsProvider>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={({ navigation }) => ({
            headerStyle: { backgroundColor: colors.card },
            headerTintColor: "white",
            headerTitleStyle: { fontWeight: "700" },

            // Global smart back button
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingHorizontal: 10 }}
                onPress={() => {
                  if (navigation.canGoBack()) {
                    navigation.goBack();
                  }
                }}
              >
                <Entypo name="chevron-left" size={24} color="white" />
              </TouchableOpacity>
            ),
          })}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Volunteer Posts" }}
          />

          <Stack.Screen
            name="CreatePost"
            component={CreatePostScreen}
            options={{ title: "Create Post" }}
          />

          <Stack.Screen
            name="Details"
            component={PostDetailsScreen}
            options={{ title: "Post Details" }}
          />

          <Stack.Screen
            name="Accepted"
            component={AcceptedVolunteersScreen}
            options={{ title: "Accepted Volunteers" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PostsProvider>
  );
}
