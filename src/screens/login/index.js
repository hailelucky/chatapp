import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

import { LoginButton, AccessToken } from 'react-native-fbsdk-next';
import useLogin from './useLogin';

const LoginScreen = () => {
  const { handleLogin, email, setEmail, password, setPassword, signInGoogle } =
    useLogin();
  const { navigate } = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text
          style={{
            color: 'white',
          }}>
          Login
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={signInGoogle} style={styles.button}>
        <Text
          style={{
            color: 'white',
          }}>
          Login with Google
        </Text>
      </TouchableOpacity> */}
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Text>No account?</Text>
        <TouchableOpacity
          onPress={() => navigate('Signup')}
          style={{
            marginLeft: 8,
          }}>
          <Text
            style={{
              color: 'blue',
            }}>
            Signup
          </Text>
        </TouchableOpacity>
      </View>
      {/* <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      /> */}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  input: {
    width: '90%',
    height: 44,
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  button: {
    marginVertical: 16,
    height: 44,
    width: 200,
    borderRadius: 99,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
