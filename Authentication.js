import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';

function Authentication() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    console.log('user: ',user) 
    if (initializing) setInitializing(false);
    
   
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;



  function createUser (){
      if(email!='' || password != ''){
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          setEmail('');
          setPassword('')
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
      
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
      
          console.error(error);
        });
      }else{
          console.log('email shouldnt be empty')
      }
    
  }

  function signIn(){
    if(email!='' || password != ''){
        auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account signed in!');
            setEmail('');
            setPassword('')
        })
        .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
        }
    
        if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
        }
    
        console.error(error);
        });
    }else{
        console.log('email shouldnt be empty')
    }
  }

  function signout(){
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  }

  
  function getCurrentUser(){ 
    console.log(auth().currentUser)
  }

  function resetPassword (){ 
        auth().sendPasswordResetEmail(email)
          .then(function (user) {
            alert('Please check your email...')
          }).catch(function (e) {
            console.log(e)
          }) 
  }

  function getToken(){
    user.getIdToken().then(function(idToken) {  // <------ Check this line 
        console.log('idToken: ',idToken) 
    });

  }
  

  if (!user) {
    return (
      <View style={{alignSelf:'center',width:"90%"}}>
        <View style={{marginBottom:15,}}>
            <Text>Register</Text>
            <TextInput placeholder='Email' onChangeText={(txt)=>setEmail(txt)} />
            <TextInput placeholder='Password' onChangeText={(txt)=>setPassword(txt)} />
            <TouchableOpacity onPress={()=>createUser()} style={{marginTop:15,width:150,height:50,backgroundColor:'purple',justifyContent:'center',alignSelf:'center'}}>
                <Text style={{alignSelf:'center',color:'white'}}>Register</Text>
            </TouchableOpacity>
        </View>

        <View style={{marginBottom:15,}}>
            <Text>Login</Text>
            <TextInput placeholder='Email' onChangeText={(txt)=>setEmail(txt)} />
            <TextInput placeholder='Password' onChangeText={(txt)=>setPassword(txt)} />
            <TouchableOpacity onPress={()=>signIn()} style={{marginTop:15,width:150,height:50,backgroundColor:'purple',justifyContent:'center',alignSelf:'center'}}>
                <Text style={{alignSelf:'center',color:'white'}}>Login</Text>
            </TouchableOpacity>
        </View>

        <View style={{marginBottom:15,marginTop:15}}>
            <Text>Reset Password</Text>
            <TextInput placeholder='Email' onChangeText={(txt)=>setEmail(txt)} />
            <TouchableOpacity onPress={()=>resetPassword()} style={{marginTop:15,width:150,height:50,backgroundColor:'blue',justifyContent:'center',alignSelf:'center'}}>
                <Text style={{alignSelf:'center',color:'white'}}>Send Email</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{alignSelf:'center'}}>
      <Text>Welcome {user.email}</Text>

      <TouchableOpacity onPress={()=>signout()} style={{marginTop:15,width:150,height:50,backgroundColor:'purple',justifyContent:'center',alignSelf:'center'}}>
        <Text style={{alignSelf:'center',color:'white'}}>Signout</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={()=>getCurrentUser()} style={{marginTop:15,width:150,height:50,backgroundColor:'green',justifyContent:'center',alignSelf:'center'}}>
        <Text style={{alignSelf:'center',color:'white'}}>Get Current User</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>getToken()} style={{marginTop:15,width:150,height:50,backgroundColor:'lightblue',justifyContent:'center',alignSelf:'center'}}>
        <Text style={{alignSelf:'center',color:'white'}}>Get tokken</Text>
      </TouchableOpacity>
      
      
    </View>
  );
}

export default Authentication;