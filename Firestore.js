import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

function Firestore() {
  // Set an initializing state whilst Firebase connects 
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [edit_name, setEditName] = useState('')
  const [edit_city, setEditCity] = useState('')

  
  const [id, setId] = useState('')
  const [docs, setDocs] = useState([])

  useEffect(async()=>{
    // const usersCollection = await firestore().collection('cafes').get();
    // usersCollection._docs.forEach(item=>{
    //     console.log(item._data)
    // }) 


    // const usersCollection = await firestore().collection('cafes').get().then(res=>{ 
    //     var temp =[]
    //     res.forEach(item=>{  
    //         temp = [...temp, {...item.data(),id:item.id}]
            
    //     }) 
 
    //     setDocs(temp) 
       
    // })

    const subscriber = firestore().collection('cafes').orderBy('name', 'asc').onSnapshot(documentSnapshot => {
        var temp =[] 
        documentSnapshot.forEach(item=>{ 
            
            temp = [...temp, {...item.data(),id:item.id}]
            
 
        
        })
        setDocs(temp) 
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
 
  },[])


  function CafeAdd (){
    firestore().collection('cafes')
        .add({
            name: name,
            city: city,
        })
        .then(() => {
            console.log('Cafe added!');
            setName('')
            setCity('')
        })
        .catch(err=>{
            console.log(err)
            setName('')
            setCity('')
        })
  }

  function CafeUpdate(Id){
    firestore()
        .collection('cafes')
        .doc(Id)
        .update({
            name: edit_name,
            city:edit_city
        })
        .then(() => {
            console.log('Cafe updated!');
        });
  }

  function CafeDelete(Id){
    firestore() 
        .collection('cafes')
        .doc(Id)
        .delete()
        .then(() => {
        console.log('User deleted!');
        });
  }

  function Filter(value, operation){
       
        firestore()
        .collection('cafes')
        // Filter results
        .where('name',operation , value)
        .get()
        .then(documentSnapshot => {
            var temp =[] 
            documentSnapshot.forEach(item=>{ 
                
                temp = [...temp, {...item.data(),id:item.id}]
            
            })
            setDocs(temp) 
        }); 
  }

  function All( ){
       
    firestore()
    .collection('cafes') 
    .get()
    .then(documentSnapshot => {
        var temp =[] 
        documentSnapshot.forEach(item=>{ 
            
            temp = [...temp, {...item.data(),id:item.id}]
            
 
        
        })
        setDocs(temp) 
    }); 
}




  
    console.log(docs)
    return (
    <View style={{width:'80%',alignSelf:'center'}}>

        <View style={{width:'100%',height:20,flexDirection:'row',justifyContent:'space-around'}}>
            <TouchableOpacity  onPress={()=>All()}  style={{width:'30%',height:'100%',backgroundColor:'gray',justifyContent:'center'}}>
                <Text style={{alignSelf:'center'}}>All</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress={()=>Filter(4,'>')}  style={{width:'30%',height:'100%',backgroundColor:'gray',justifyContent:'center'}}>
                <Text style={{alignSelf:'center'}}>Less than 4</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>Filter(4,'<')} style={{width:'30%',height:'100%',backgroundColor:'gray',justifyContent:'center'}}>
                <Text style={{alignSelf:'center'}}>Greater than 4</Text>
            </TouchableOpacity>
        </View>

        <View style={{height:150,backgroundColor:'rgba(50,50,50,0.2)',marginBottom:15}}>
            <FlatList 
                data={docs}
                keyExtractor={item => item.id}
                renderItem={(item)=>{
                    console.log(item.item)
                    let item_data = item.item;
                    return(
                        <View style={{height:40,width:'100%',borderBottomWidth:1}}>
                            <Text>Name: {item_data.name} | City {item_data.city} </Text>
                            <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around'}}>
                                <TouchableOpacity style={{backgroundColor:'lightblue'}} onPress={()=>{
                                    setEditCity(item_data.city)
                                    setEditName(item_data.name)
                                    setId(item_data.id)
                                }}>
                                    <Text>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor:'pink'}} onPress={()=>{
                                    CafeDelete(item_data.id)
                                }}>
                                    <Text>Delete</Text>
                                </TouchableOpacity>
                            </View>
                           
                        </View>
                    )
                }}
            />
        </View>


        <Text>Edit</Text>
        
        <TextInput value={edit_name} placeholder='Name' onChangeText={(txt)=>setEditName(txt)} />
        <TextInput value={edit_city} placeholder='City' onChangeText={(txt)=>setEditCity(txt)} />

        <TouchableOpacity onPress={()=>CafeUpdate(id)} style={{marginTop:15,width:150,height:50,backgroundColor:'lightblue',justifyContent:'center',alignSelf:'center'}}>
            <Text style={{alignSelf:'center',color:'white'}}>Edit Cafe</Text>
        </TouchableOpacity>


        <Text>Add</Text>
        <TextInput placeholder='Name' onChangeText={(txt)=>setName(txt)} />
        <TextInput placeholder='City' onChangeText={(txt)=>setCity(txt)} /> 
        <TouchableOpacity onPress={()=>CafeAdd()} style={{marginTop:15,width:150,height:50,backgroundColor:'lightblue',justifyContent:'center',alignSelf:'center'}}>
          <Text style={{alignSelf:'center',color:'white'}}>Add Cafe</Text>
        </TouchableOpacity>
    
    
  </View>
  );
}

export default Firestore;