import {Text,Button} from 'react-native'
import {
    Stack,
    VStack,
    Center,
    Box,
    Divider,
    Heading,
    ScrollView
} from "native-base";
import {SafeAreaView} from 'react-native-safe-area-context'
export default function Home({navigation}) {
    return(
     <SafeAreaView>
          <ScrollView>
            <VStack>
        <Box
            bg="blue.500"
            p="4"
            shadow={3}
            width="100%"
            _text={{fontSize:"md",color:"white",fontWeight:"bold"}}
            >Absensi Wajah</Box>

        <Center>
        <Stack direction="row">
            <Button title="Absen masuk"
            onPress={()=>navigation.navigate("Masuk")}/>
            <Center size="16"  shadow={4} p ="4" m="3"bg="red.500"
            _text={{color:"white"}}
            rounded="sm">
                Absen masuk
            </Center>
        </Stack>
        </Center>
        <Divider/>
        <Heading size="sm" m="3">Riwayat Absensi</Heading>
        <Center bg="white" p="3"shadow={4} m="2" >
            <Stack direction="row" space={4}>
            <Box _text={{fontWeight:"bold"}}>Senin, 24 Agustus 2022</Box>
                <Box>Absen : 18.00</Box>
                <Box bg="green.500" p="1">Masuk</Box>
            </Stack>
        </Center>
        </VStack>
      </ScrollView>
     </SafeAreaView>
    )
}
