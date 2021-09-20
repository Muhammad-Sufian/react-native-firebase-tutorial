import DocumentPicker from 'react-native-document-picker'
import React, { useEffect, useState } from 'react';
import { Alert,View,TouchableOpacity,Text, PermissionsAndroid } from 'react-native';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs'
import auth from '@react-native-firebase/auth';

function Bucket (){
    const [filePath, setfilePath] = useState('')
    const [fileName, setfileName] = useState('')
   
   async function pick_file(){



        try {
            const res = await DocumentPicker.pickSingle({
              type: [DocumentPicker.types.allFiles],
              mode:'import'
            })
            console.log(
              res.uri,
              res.type, // mime type
              res.name,
              res.size,
            )
 
            // if (res.uri.startsWith('content://')) {
            //     const urlComponents = res.uri.split('/')
            //     const fileNameAndExtension = urlComponents[urlComponents.length - 1]
            //     const destPath = `${RNFS.TemporaryDirectoryPath}/${fileNameAndExtension}`
            //     setfilePath(destPath)
            //     await RNFS.copyFile(res.uri, destPath)
            //     console.log(destPath)
            // }

            // var data = await RNFS.readFile(res.uri, 'base64' )  
            console.log(res)
            //for ios
            setfilePath(res.uri)
            setfileName(res.name)

          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err
            }
          }
    }

    const login = async () =>{
        auth()
        .signInWithEmailAndPassword('user1@yopmail.com', 'Test123')
        .catch(er=>console.log(err))
    
    }

    const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: "Document Permission",
              message:
                "Permission to grant access to documents",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the documents");
          } else {
            console.log("permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };

      function listFilesAndDirectories() {
        var reference = storage().ref('/');
         reference.list().then(async result => {
          // Loop over each item
          result.items.forEach(async ref => {
            console.log(ref.fullPath);

            //download or display url
            const url = await storage().ref(ref.fullPath).getDownloadURL();
            console.log(url)
          });
        
        });
      }
       
      listFilesAndDirectories()
      

    return(
        <View style={{height:'100%',width:"100%", justifyContent:"space-around"}}>

            <TouchableOpacity onPress={()=>requestCameraPermission()} style={{height:80,width:150,backgroundColor:'rgba(100,0,0,0.3)',alignSelf:'center',justifyContent:'center'}}>
                <Text style={{alignSelf:'center'}}>requestCameraPermission</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>login()} style={{height:80,width:150,backgroundColor:'rgba(100,0,0,0.3)',alignSelf:'center',justifyContent:'center'}}>
                <Text style={{alignSelf:'center'}}>login</Text>
            </TouchableOpacity>

            
            <TouchableOpacity onPress={()=>pick_file()} style={{height:80,width:150,backgroundColor:'rgba(100,0,0,0.3)',alignSelf:'center',justifyContent:'center'}}>
                <Text style={{alignSelf:'center'}}>Pick file</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={async () => {
            // path to existing file on filesystem
            const pathToFile = filePath;
            // uploads file
            console.log('Path: ',pathToFile)
            const reference = storage().ref(fileName);
            console.log(utils.FilePath.DOCUMENT_DIRECTORY )
            // await reference.putString(pathToFile );
            await reference.putFile(pathToFile);
            
            }} style={{height:80,width:150,backgroundColor:'rgba(100,1000,0,0.3)',alignSelf:'center',justifyContent:'center'}}>
                <Text style={{alignSelf:'center'}}>Upload</Text>
            </TouchableOpacity>


            
        </View>
    )
}
// Pick a single file


export default Bucket;