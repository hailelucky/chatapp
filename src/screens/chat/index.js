import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { faker } from '@faker-js/faker';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth } from '../../config/firebase';
import useChat from './useChat';

const ChatScreen = () => {
  const { handeLogout, messsages, onSend } = useChat();

  const avatar = faker.image.avatar();

  return (
    <View style={{ flex: 1, paddingTop: 16 }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={handeLogout} style={styles.button}>
          <Text
            style={{
              color: 'white',
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <GiftedChat
        messages={messsages}
        onSend={onSend}
        user={{
          _id: auth?.currentUser?.email,
          avatar,
        }}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 8,
  },
});
