import React,{useRef,useState,useEffect} from 'react';
import {View,StyleSheet,
  ToastAndroid,Button,Text,Dimensions,TouchableOpacity} from 'react-native'
import {
    Box,
    Stack,
    VStack,
    Heading,
    Center
} from 'native-base'
import {supabase} from '../supabase.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SafeAreaView} from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

export default function Masuk({navigation}){
  const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let camera;
const [noface,setNoface] = useState("false");
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [faceData, setFaceData] = useState([]);
    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
          console.log("IZIN KAMERA")
        })();
      }, []);
async function ambilgambar(){
if(noface === "false"){
  if (camera && faceData) {
      let photo = await camera.takePictureAsync();
      console.log(photo)
      if(photo){
      await AsyncStorage.setItem("photonya",photo.uri)
      .then(()=>navigation.navigate("Maps"))
      }
    }
  else{
    console.log("gagal bllon")
  }
}
else{
  ToastAndroid.show("WAJAH TIDAK TERDETEKSI", ToastAndroid.TOP);
  console.log("kosos")
}
}
    function handleFacesDetected({faces}){
        if(faces.length === 1){
            setFaceData(faces);
            console.log(faces)
            setNoface("false")
        }
        else{
            console.log("ga ada muka")
            setNoface("true")
            // return (
            //     <View style={styles.faces}>
            //       <Text style={styles.faceDesc}>No faces :(</Text>
            //     </View>
            //   );
        }

    }

    return(
        <SafeAreaView style={{flex:1}} >
        <Stack direction="row" p="5"
        shadow={4}
        bg="green.500" space={8}>
        <AntDesign name="arrowleft" size={24} color="black"
        onPress={()=>navigation.goBack()}
        />
        <Heading size="md" style={{color:"white"}}>Absen masuk</Heading>
        </Stack>
        <Camera
        type={type}
        ref={ref => (camera = ref)}
        style={{flex:1}}
          // other props
          onFacesDetected={handleFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
            runClassifications: FaceDetector.FaceDetectorClassifications.none,
            minDetectionInterval: 100,
            tracking: true,
          }}
        >

<TouchableOpacity onPress={ambilgambar}
style={{
  top:windowHeight-220,
  backgroundColor:"blue",
  margin:20,
  height:50,
  padding:5
}}
>
<Text style={{
  color:"white",
fontSize:20,
textAlign:"center"
}}>Ambil Gambar</Text>
</TouchableOpacity>

        </Camera>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    camera: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    faces: {
      backgroundColor: '#ffffff',
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 16,
    },
    faceDesc: {
      fontSize: 20
    }
  });
