import { signInWithEmailAndPassword, sin } from 'firebase/auth';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { auth } from '../../config/firebase';

const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  GoogleSignin.configure({
    webClientId:
      '1085136609043-tm9jn5fa0eej27r4l5ufc3k1m69dji57.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  });

  const handleLogin = useCallback(() => {
    if (!!email && !!password) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('Login Success');
        })
        .catch(err => {
          Alert.alert('Login Fail', err.message);
        });
    } else {
      Alert.alert('Sigup Fail', 'Email/Password not empty');
    }
  }, [email, password]);

  // Somewhere in your code
  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log(
        '🚀 ~ file: useLogin.js:38 ~ signInGoogle ~ userInfo',
        userInfo,
      );
    } catch (error) {
      console.log('🚀 ~ file: useLogin.js:43 ~ signInGoogle ~ error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    signInGoogle,
  };
};

export default useLogin;
