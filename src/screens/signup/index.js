import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import useSignup from './useSignup';

const SignupScreen = () => {
  const { handleSignup, email, setEmail, password, setPassword } = useSignup();

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

      <TouchableOpacity onPress={handleSignup} style={styles.button}>
        <Text
          style={{
            color: 'white',
          }}>
          Sigup
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

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
