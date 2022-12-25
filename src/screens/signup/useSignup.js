import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { auth } from '../../config/firebase';

const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = useCallback(() => {
    if (!!email && !!password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('Sigup Success');
        })
        .catch(err => {
          Alert.alert('Sigup Fail', err.message);
        });
    } else Alert.alert('Sigup Fail', 'Email/Password not empty');
  }, [email, password]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSignup,
  };
};

export default useLogin;
