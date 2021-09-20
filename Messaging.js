import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

function Messaging() {
  useEffect(() => {
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //     console.log(remoteMessage)
    //   Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
    // });

    // return unsubscribe;

    // Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    Alert.alert('Message handled in the background!', remoteMessage);
  });
  }, []);

  
      return<></>
  
}

export default Messaging