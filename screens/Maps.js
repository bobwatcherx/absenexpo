import {View,Text,Image,ScrollView,StyleSheet,
  TouchableOpacity
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect,useState} from 'react'
import {Box,VStack,Stack,Heading,Flex} from 'native-base'
import * as Location from 'expo-location';
import {WebView} from 'react-native-webview'
export default function Maps({navigation}){

  const aslilatitude = -6.257525639863318
  const aslilongitude =  107.018132571971
  const [photo,setPhoto] = useState("")
   const [location, setLocation] = useState(null);
   const [errorMsg, setErrorMsg] = useState(null);
   const [latitude, setLatitude] = useState(null);
     const [longitude, setLongitude] = useState(null);
     async function ceklokasi(){
       let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude)
       setLongitude(location.coords.longitude);
       setLocation(location.coords);
     }
  useEffect(async()=>{
    try{
      let val = await AsyncStorage.getItem("photonya")
      if(val !== null){
        setPhoto(val)
      }
    }
    catch(err){
      navigation.navigate("Home")
        console.log("datanya" + err)
    }
    ceklokasi()
  },[])

  function geocek(){
    if(aslilatitude == latitude && aslilongitude == longitude){
      return (
        <View>
        <Text>sesuia lokasi ..</Text>
        </View>
      )
    }
    return (
      <Box p="4" m="3"  width="100%">
      <Heading size="md"
      _text={{color:"red"}}
      >Lokasi tidak sesuai tempat Absen</Heading>
      </Box>
    )
  }

  return  (
    <SafeAreaView>
    {errorMsg &&
    <Text>{errorMsg}</Text>
    }
  {!errorMsg &&
<ScrollView>
<Flex direction="row" p="3"  bg="red.800"
justifyContent="space-between"
shadow={3}>
<Text style={{color:"white",fontSize:20}}>Mencari lokasi</Text>
<TouchableOpacity>
<Text style={{color:"white",fontSize:20}}>Batal</Text>

</TouchableOpacity>
</Flex>
<Text>
{geocek()}
</Text>
<WebView
     style={styles.container}
     source={{ uri: 'http://maps.google.com/maps?q='+ latitude +',' + longitude }}
   />
</ScrollView>

  }
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
  		height: 500,
  		backgroundColor: "white",
  		flex: 1,
  },
});
