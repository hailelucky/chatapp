import React, { createContext, useEffect, useMemo, useState } from 'react';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MainContext = createContext(null);

export const MainContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [deviceToken, setDeviceToken] = useState('');

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission({
      alert: true,
      announcement: false,
      badge: true,
      carPlay: false,
      provisional: false,
      sound: true,
    });

    console.log('Authorization status:', authStatus);
    getFCMToken();
  };

  const registerAppWithFCM = async () => {
    await messaging().registerDeviceForRemoteMessages();
  };

  const getFCMToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('🚀 old fcmToken', fcmToken);

    if (!fcmToken) {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          setDeviceToken(fcmToken);
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      } catch (error) {
        console.log('🚀 ~ getFCMToken ~ error', error);
      }
    } else {
      setDeviceToken(fcmToken);
    }
  };

  useEffect(() => {
    registerAppWithFCM();
    requestUserPermission();

    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log('🚀background state  remoteMessage', remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          console.log(
            '🚀 Notification caused app to open quit state',
            remoteMessage,
          );
        }
      });

    messaging().onMessage(async remoteMessage => {
      console.log('foreground state  remoteMessage', remoteMessage);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        channelId: 'fcm_fallback_notification_channel',
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        bigPictureUrl: remoteMessage.notification.android.imageUrl,
        smallIcon: remoteMessage.notification.android.imageUrl,
      });
    });
    return unsubscribe;
  }, []);

  const memoedValue = useMemo(
    () => ({
      deviceToken,
      setDeviceToken,
      user,
      setUser,
    }),
    [deviceToken, user],
  );

  return (
    <MainContext.Provider value={memoedValue}>{children}</MainContext.Provider>
  );
};
