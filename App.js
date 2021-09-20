 

import React, { useEffect } from 'react'; 
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
 
import Authentication from './Authentication'
import Firestore from './Firestore'
import Messaging from './Messaging'
import PhoneAuth from './PhoneAuth'
import Bucket from './Bucket'

import Crashlytics from './Crashlytics'
import RealTimeDB from './RealTimeDB'


const App = () => {



  return (
    <SafeAreaView style={{height:'100%',width:'100%',justifyContent:'center' }}> 
       
       <RealTimeDB/> 
    </SafeAreaView>
  );
};
 

export default App;
