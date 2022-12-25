import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { auth, database } from '../../config/firebase';

const useChat = () => {
  const [messsages, setMesssages] = useState([]);
  const navigation = useNavigation();

  const handeLogout = useCallback(() => {
    signOut(auth).catch(err => {
      Alert.alert('logout Fail', err.message);
    });
  }, []);

  const onSend = useCallback((messages = []) => {
    setMesssages(preMessages => GiftedChat.append(preMessages, messages));
    const { _id, createdAt, text, user } = messages[0];

    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  useEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const unsubcribe = onSnapshot(q, snapshot => {
      console.log('🚀 snapshot', snapshot.docs[0].data().user);
      setMesssages(
        snapshot.docs.map(doc => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc?.data().text,
          user: doc?.data().user,
        })),
      );
    });

    return unsubcribe;
  }, []);

  return {
    handeLogout,
    navigation,
    onSend,
    messsages,
  };
};

export default useChat;
