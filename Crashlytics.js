import DocumentPicker from 'react-native-document-picker'
import React, { useEffect, useState } from 'react';
import { Alert,View,TouchableOpacity,Text, PermissionsAndroid } from 'react-native'; 
import crashlytics from '@react-native-firebase/crashlytics';

function Crashlytics (){
    
    const crash = ()=> {
        try{
            number = number + 1;
        }catch(err){
            console.log(err)
            crashlytics().recordError(err);
            crashlytics().crash()
        }
    }
    useEffect(()=>{
        crashlytics().crash()
        console.log('called')
    },[])
    return(
        <View style={{height:'100%',width:"100%", justifyContent:"space-around"}}>

           <TouchableOpacity onPress={()=>crash()}>
                <Text>Crash</Text>
           </TouchableOpacity>

            
        </View>
    )
}
// Pick a single file


export default Crashlytics;