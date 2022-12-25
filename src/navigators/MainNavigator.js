import React, { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainContext } from '../contexts/MainContextProvider';
import { ChatScreen, LoginScreen, SignupScreen } from '../screens';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

export const MainStackNavigator = () => {
  const { user, setUser } = useContext(MainContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, async authUser => {
      authUser ? setUser(authUser) : setUser(null);
      setLoading(false);
    });

    return () => unsubcribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen name="Chat" component={ChatScreen} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};
