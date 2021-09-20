import DocumentPicker from 'react-native-document-picker'
import React, { useEffect, useState } from 'react';
import { Alert,View,TouchableOpacity,Text, PermissionsAndroid } from 'react-native'; 
import database from '@react-native-firebase/database';



function RealTimeDB (){ 
const [likesState, setLikes] = useState(1)
    const write = ()=> {
        database()
            .ref('/users/2')
            .set({
                name: 'Ada Lovelace',
                age: 40,
            })
            .then(() => console.log('Data set.'));
    }

    const update = ()=> {
        database()
            .ref('/users/2')
            .update({
                age: 32,
            })
            .then(() => console.log('Data updated.'));
    }

    const pushData = ()=> {
        const newReference = database().ref('/users').push();

        console.log('Auto generated key: ', newReference.key);
        
        newReference
          .set({
            age: 32,
          })
          .then(() => console.log('Data updated.'));
    }

    const onPostLike = async()=>{
        const reference = database().ref(`/post/1`);

        // Execute transaction
        return reference.transaction(currentLikes => {
            console.log(currentLikes)
           
          if (currentLikes === null){
            // setLikes(currentLikes + 1)
            return 1;
          }

        //   setLikes(currentLikes + 1)
          return currentLikes + 1;
        });
    }
    onPostLike('/post/1').then(transaction => {
        console.log('New post like count: ', transaction.snapshot.val());
    });

    const remove = async()=>{
        await database().ref('/users/1').remove();
    }
    
    useEffect(()=>{
        //read once 
        // database()
        // .ref('/users/2')
        // .once('value')
        // .then(snapshot => {
        //     console.log('User data: ', snapshot.val());
        // });

        //read with change listener
        const onValueChange = database()
            .ref(`/users/2`)
            .on('value', snapshot => {
            console.log('User data: ', snapshot.val());
            });
    
        
        // Stop listening for updates when no longer required
        return () => database().ref(`/users/2`).off('value', onValueChange);
    },[])
  
    
    return(
        <View style={{height:'100%',width:"100%", justifyContent:"space-around"}}>

           <TouchableOpacity onPress={()=>write()}>
                <Text>Write</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>update()}>
                <Text>Update</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>pushData()}>
                <Text>pushData</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>remove()}>
                <Text>remove</Text>
           </TouchableOpacity>
           <Text>{likesState}</Text>
           <TouchableOpacity onPress={()=>onPostLike()}>
                <Text>transaction</Text>
           </TouchableOpacity>
           
            
        </View>
    )
}
// Pick a single file


export default RealTimeDB;